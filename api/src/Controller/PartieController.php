<?php

namespace App\Controller;

use App\Entity\Partie;
use App\Entity\PartieCreate;
use App\Entity\PartieRejoint;
use App\Entity\Voiture;
use App\Form\PartieType;
use App\Form\RejoindrePartieType;
use App\Repository\PartieRejointRepository;
use App\Repository\PartieRepository;
use App\Repository\TirageResultatRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;



class PartieController extends AbstractController
{

    #[Route('/api/partie', name: 'app_get_partie')]
    public function getParties(PartieRepository $partieRepository, PartieRejointRepository $partieRejointRepository)
    {
        $parties = $partieRepository->findAll();

        return $this->json(['parties' => $parties], 200, [], ['groups' => 'partie']);
    }

    #[Route('/api/partie/view/{id}/', name: 'parties_view')]
    public function view(PartieRejointRepository $partieRejointRepository, PartieRepository $partieRepo, $id): Response
    {
        $partiesRejoints = $partieRejointRepository->findBy(['partie' => $id]);

        return $this->json(['parties' => $partiesRejoints,], 200, [], ['groups' => ['partie_view']]);
    }

    #[Route('/api/partie/create', name: 'partie_create')]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        $partie = new Partie();
        $partieCreate = new PartieCreate();
        $partieRejoint = new PartieRejoint();
        $user = $this->getUser();

        $partie->setName($data['name']);
        $partie->setCreateur($user);
        $partie->setState(false);
        if ($data['password']) {
            $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
            $partie->setPassword($hashedPassword);
        }
        $partieRejoint->setRole("hote");
        $partieRejoint->setUser($user);
        $partieRejoint->setPartie($partie);
        $partieCreate->setUser($user);
        $partieCreate->setPartie($partie);

        $em->persist($partie);
        $em->persist($partieCreate);
        $em->persist($partieRejoint);
        $em->flush();

        return $this->json(['message' => 'Partie créée avec succès'], Response::HTTP_CREATED);
    }


    #[Route('/api/partie/{id}/edit', name: 'partie_edit')]
    public function edit(Partie $partie, Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher): Response
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $partie->setName($data['name'] ?? $partie->getName());

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


    #[Route('/api/partie/{id}', name: 'partie_delete', methods: ['DELETE'])]
    public function remove(Partie $partie, EntityManagerInterface $em)
    {
        $em->remove($partie);
        $em->flush();

        return $this->json(['message' => 'Partie supprimée avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/api/partie/rejoindre/{id}', name: 'partie_rejoindre')]
    public function rejoindre(Request $request, Partie $partie, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $password = $data['password'] ?? null;

        if ($partie->getPassword() !== null && (!password_verify($password, $partie->getPassword()))) {
            return $this->json(['error' => 'Mot de passe incorrect'], 403);
        }

        // Si la partie ne nécessite pas de mot de passe, rejoignez directement
        $userInterface = $this->getUser();
        $user = $userRepository->find($userInterface->getId());

        $partieRejoint = new PartieRejoint();
        $partieRejoint->setUser($user);
        $partieRejoint->setPartie($partie);
        $partieRejoint->setRole("joueur");

        $em->persist($partieRejoint);
        $em->flush();


        return $this->json(['success' => 'Partie rejoint avec succès']);
    }


    #[Route('/api/partie/quitter/{id}', name: 'partieRejoint_quitter', methods: ['DELETE'])]
    public function quitter(PartieRejoint $partieRejoint, EntityManagerInterface $em)
    {
        $em->remove($partieRejoint);
        $em->flush();

        return $this->json(['success' => 'Partie quittée avec succès'], Response::HTTP_CREATED);
    }
}
