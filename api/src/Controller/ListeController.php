<?php

namespace App\Controller;

use App\Entity\Liste;
use App\Repository\ListeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ListeController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager, private ListeRepository $listeRepository) {

    }

    #[Route('/api/getMyList', name: 'get_my_list', methods: ['GET'])]
    public function getMyList(Request $request): Response
    {
        $data = $this->listeRepository->findBy(['user' => $this->getUser()]);
        return $this->json($data, 200, [], ['groups' => ['liste']]);
    }

    #[Route('/api/getMyListLimited', name: 'get_my_list_limited', methods: ['GET'])]
    public function getMyListLimited(Request $request): Response
    {
        $data = $this->listeRepository->findBy(['user' => $this->getUser()], ['id' => 'DESC'], 15);
        return $this->json($data, 200, [], ['groups' => ['liste']]);
    }

    #[Route('/api/addToList', name: 'add_to_list')]
    public function addToList(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        try {
            $addToList = new Liste();
            $addToList->setTitreId($data['titre_id'])
                ->setType($data['type'])
                ->setUser($this->getUser())
                ->setAddedAt(new \DateTimeImmutable());
            $this->entityManager->persist($addToList);
            $this->entityManager->flush();
            return $this->json($addToList, 200, [], ['groups' => ['liste']]);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/removeFromList', name: 'remove_from_list')]
    public function removeFromList(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        try {
            $exist = $this->listeRepository->findOneBy(['titre_id' => $data['titre_id'], 'user' => $this->getUser()]);
            if ($exist) {
                $this->entityManager->remove($exist);
                $this->entityManager->flush();
            }
            return $this->json("success", 200);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/isAdded', name: 'is_added')]
    public function isAdded(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $exist = $this->listeRepository->findOneBy(['titre_id' => $data['titre_id'], 'user' => $this->getUser()]);
        if ($exist) {
            return $this->json($exist, 200, [], ['groups' => ['liste']]);
        }
        return $this->json(null, 200);
    }
}
