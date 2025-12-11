<?php

namespace App\Controller;

use App\Entity\Demande;
use App\Entity\User;
use App\Repository\DemandeRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DemandeController extends AbstractController
{

    public function __construct(private EntityManagerInterface $entityManager, private DemandeRepository $demandeRepository)
    {

    }
    #[Route('/api/demande/{id}', name: 'envoie_demande')]
    public function Demande(User $user): Response
    {
        try {
            $demande = new Demande();
            $demande->setDemandeur($this->getUser());
            $demande->setReceveur($user);
            $demande->setCreatedAt(new \DateTimeImmutable());
            $this->entityManager->persist($demande);
            $this->entityManager->flush();
            return $this->json($demande, 200, [], ['groups' => ['demande']]);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), 400);
        }
    }

    #[Route('/api/fakeDemande', name: 'fake_demande')]
    public function fakeDemande(UserRepository $userRepository): Response
    {
        try {
            $demande = new Demande();
            $user = $userRepository->findOneBy(['id' => 4]);
            $demande->setDemandeur($user);
            $demande->setReceveur($this->getUser());
            $demande->setCreatedAt(new \DateTimeImmutable());
            $this->entityManager->persist($demande);
            $this->entityManager->flush();
            return $this->json($demande, 200, [], ['groups' => ['demande']]);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), 400);
        }
    }

    #[Route('/api/getDemandes', name: 'get_demandes')]
    public function getDemandes(): Response
    {
        $demandes = $this->demandeRepository->findBy(['receveur' => $this->getUser()]);
        return $this->json($demandes, 200, [], ['groups' => ['demande']]);
    }

    #[Route('/api/deleteDemande', name: 'delete_demande')]
    public function deleteDemande(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $demande = $this->demandeRepository->findOneBy(['receveur' => $data['receveur'], 'demandeur' => $this->getUser()]);
        $this->entityManager->remove($demande);
        $this->entityManager->flush();
        return $this->json(['success'=> 'success'], 200);
    }

    #[Route('/api/refuserDemande', name: 'refuser_demande')]
    public function refuserDemande(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $demande = $this->demandeRepository->findOneBy(['receveur' => $this->getUser(), 'demandeur' => $data['demandeur']]);
        $this->entityManager->remove($demande);
        $this->entityManager->flush();
        return $this->json(['success'=> 'success'], 200);
    }


}
