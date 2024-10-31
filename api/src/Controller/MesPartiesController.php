<?php

namespace App\Controller;

use App\Entity\Choix;
use App\Entity\Partie;
use App\Entity\PartieRejoint;
use App\Entity\Restriction;
use App\Entity\TirageResultat;
use App\Entity\User;
use App\Form\PartieType;
use App\Form\RestrictionType;
use App\Form\SouhaitType;
use App\Repository\ChoixRepository;
use App\Repository\PartieRejointRepository;
use App\Repository\PartieRepository;
use App\Repository\RestrictionRepository;
use App\Repository\TirageResultatRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Id;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


class MesPartiesController extends AbstractController
{

    #[Route('/api/mesParties', name: 'app_mes_parties')]
    public function getMesParties(PartieRejointRepository $partieRejointRepository, PartieRepository $partieRepository): Response
    {
        $userId = $this->getUser()->getId();
        $partiesRejoints = $partieRejointRepository->findBy(['user'=>$userId]);
        $parties = $partieRepository->findAll();

        return $this->json(['parties' => $partiesRejoints], 200, [], ['groups' => 'mes_parties']);

    }

    

    #[Route('/api/mesParties/quitter/{id}', name: 'mesPartiesRejoints_quitter', methods: ['DELETE'])]
    public function quitter(PartieRejoint $partieRejoint, EntityManagerInterface $em)
    {
        $em->remove($partieRejoint);
        $em->flush();

        return $this->json(['success' => 'Partie quittée avec succès'], Response::HTTP_CREATED);
    }


    #[Route('/api/mesParties/view/{id}', name: 'mes_parties_view')]
    public function view(RestrictionRepository $restrictionRepository, ChoixRepository $choixRepository, PartieRejointRepository $partieRejointRepository, PartieRepository $partieRepo, $id, UserRepository $userRepository, TirageResultatRepository $tirageResultatRepository): Response
    {
        $user = $this->getUser();
        $partie = $partieRepo->find($id);
        $users = $userRepository->findAll();
        // $choix = $choixRepository->findBy(['partie' => $partie]);
        // $choixFinal = "";
        $tirageResultatRepo = $tirageResultatRepository->findBy(['partie' => $partie]);
        $tirages = $tirageResultatRepository->findAll();
        $restrictions = $restrictionRepository->findAll();


        // if ($choix) {
        //     $choixFinal = $choixRepository->findOneBy(['joueur' => $user, 'partie' => $partie])->getPersonneChoisie()->getUsername();
        // }
        

        $partiesRejoints = $partieRejointRepository->findBy(['partie' => $partie]);


        return $this->json(['parties'=>$partiesRejoints], 200, [], ['groups' => 'mes_parties_view']);
    }


    #[Route('/api/mesParties/{id}/edit', name: 'mes_parties_edit')]
    public function edit(Partie $partie, Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher): Response
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $partie->setName($data['name'] ?? $partie->getName());

        // Gestion du mot de passe
        if ($data['no_password'] ?? false) {
            $partie->setPassword(null);
        } else {
            $plainPassword = $data['password'] ?? '';
            if (!empty($plainPassword)) {
                $hashedPassword = $hasher->hashPassword($user, $plainPassword);
                $partie->setPassword($hashedPassword);
            }
        }

        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Partie mise à jour avec succès',
            'partie' => [
                'id' => $partie->getId(),
                'name' => $partie->getName()
            ]
        ]);
    }

    #[Route('/api/mes-parties/{id}', name: 'mes_parties_delete', methods: ['DELETE'])]
    public function remove(Partie $partie, EntityManagerInterface $em)
    {
        $em->remove($partie);
        $em->flush();
        $this->addFlash('success', 'Suppression Réussie');
        return $this->redirectToRoute('app_partie');
    }

    #[Route('/api/mesParties/{id}/tirage', name: 'partie_tirage')]
    public function tirageAuSort(RestrictionRepository $restrictionRepository, PartieRepository $partieRepository, PartieRejointRepository $partieRejointRepository, EntityManagerInterface $em, $id, UserRepository $userRepository): Response
    {
        $partie = $partieRepository->find($id);
        $partiesRejoints = $partieRejointRepository->findByPartieId($partie->getId());
        $restrictions = $restrictionRepository->findByPartieId($id);

        // Récupération des participants
        $participants = [];
        foreach ($partiesRejoints as $partieRejoint) {
            $participants[] = $partieRejoint['userId'];
        }

        // Vérification du nombre de participants
        if (count($participants) < 2) {
            $this->addFlash('error', 'Le tirage au sort nécessite au moins 2 participants.');
            return $this->redirectToRoute('mes_parties_view', ['id' => $id]);
        }

        // Copie des participants pour les destinataires
        $destinataires = $participants;

        do {
            shuffle($destinataires);

            $tirageValide = true;

            foreach ($participants as $index => $participantId) {
                $participant = $userRepository->find($participantId);
                $destinataire = $userRepository->find($destinataires[$index]);

                if ($participantId === $destinataires[$index]) {
                    $tirageValide = false;
                    break; // Quitte la boucle si un utilisateur se tire lui-même
                }

                if ($restrictions) {
                    if (!$this->tirageValideRestriction($partie->getId(), $participant, $destinataire, $restrictionRepository)) {
                        $tirageValide = false;
                        break;
                    }
                }
            }
        } while (!$tirageValide);

        // Sauvegarde du tirage dans la base de données
        foreach ($participants as $index => $participantId) {
            $participant = $userRepository->find($participantId);
            $destinataire = $userRepository->find($destinataires[$index]);

            $tirageResultat = new TirageResultat();
            $tirageResultat->setJoueur($participant);
            $tirageResultat->setDestinataire($destinataire);
            $tirageResultat->setPartie($partie);

            $em->persist($tirageResultat);
        }
        $partie->setState(true);

        $em->flush();


        return $this->json(['success' => 'Tirage effectué avec succès']);
    }

    private function tirageValideRestriction(int $idPartie, User $joueur, User $interdit, RestrictionRepository $restrictionRepository): bool
    {
        $restriction = $restrictionRepository->findRestriction($idPartie, $joueur->getId(), $interdit->getId());

        return $restriction === null;
    }


    #[Route('/api/mesParties/terminer/{id}', name: 'partie_terminee')]
    public function finPartie(RestrictionRepository $restrictionRepository, ChoixRepository $choixRepository, int $id, TirageResultatRepository $tirageResultatRepository, EntityManagerInterface $em, PartieRepository $partieRepository): Response
    {
        $partie = $partieRepository->find($id);
        if (!$partie) {
            $this->addFlash('error', 'Partie non trouvée.');
            return $this->redirectToRoute('app_mes_parties');
        }

        $tirages = $tirageResultatRepository->findBy(['partie' => $partie]);
        $choix = $choixRepository->findBy(['partie' => $partie]);
        $restrictions = $restrictionRepository->findBy(['partie' => $partie]);

        foreach ($tirages as $tirage) {
            $em->remove($tirage);
        }

        foreach ($choix as $ligne) {
            $em->remove($ligne);
        }

        // foreach ($restrictions as $ligne) {
        //     $em->remove($ligne);
        // }
        $partie->setState(false);

        $em->flush();


        return $this->json(['success' => 'fin de partie avec succès']);
    }


    #[Route('/api/mesParties/souhaits/{id}/{idUser}', name: 'souhaits_view')]
    public function getSouhaits(Partie $partie,PartieRejointRepository $partieRejointRepository, PartieRepository $partieRepo, $id, $idUser, UserRepository $userRepository, TirageResultatRepository $tirageResultatRepository): Response
    {

        $user = $this->getUser()->getId();
        $partiesRejoints = $partieRejointRepository->findby(['partie'=>$partie,'user'=>$user]);

        return $this->json(['souhaits' => $partiesRejoints], 200, [], ['groups' => 'souhaits']);

    }

    #[Route('/api/mesParties/{id}/updateSouhaits', name: 'updateSouhaits')]
    public function updateSouhaits(Partie $partie, PartieRejointRepository $partieRejointRepository, Request $request, EntityManagerInterface $em, $id): Response
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $partieRejoint = $partieRejointRepository->findOneBy([
            'partie' => $partie,
            'user' => $user
        ]);
        $partieRejoint->setSouhaits($data);
        $em->persist($partieRejoint);
        $em->flush();

        return $this->json(['success' => 'Souhait ajouté avec succès']);
    }


    #[Route('/api/mesParties/view/{id}/{idUser}', name: 'mes_parties_kick_user', methods: ['DELETE'])]
    public function kick(Partie $partie, RestrictionRepository $restrictionRepository, PartieRejointRepository $partieRejointRepository, int $idUser, EntityManagerInterface $em)
    {
        $restriction = $restrictionRepository->findOneBy(['joueur' => $idUser, 'partie'=>$partie ]);
        if($restriction) {
            $em->remove($restriction);
        }
        $user = $partieRejointRepository->findOneBy(['user' => $idUser]);
        $em->remove($user);
        $em->flush();
        return $this->json(['success' => 'Joueur ejecté avec succès']);
    }

    #[Route('/api/mesParties/view/{id}/restriction/getUsers', name: 'mes_parties_getUserParties')]
    public function getUserParties(Partie $partie, PartieRejointRepository $partieRejointRepository) {
        $role = $partieRejointRepository->findBy(['partie'=>$partie, 'user'=> $this->getUser()->getId()]);
        $partiesRejoints = $partieRejointRepository->findBy(['partie'=>$partie]);

        return $this->json(['users' => $partiesRejoints, 'role'=>$role], 200, [], ['groups' => 'getUsersPartie']);

    }
}
