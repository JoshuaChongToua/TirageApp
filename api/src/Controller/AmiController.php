<?php

namespace App\Controller;

use App\Entity\Ami;
use App\Repository\AmiRepository;
use App\Repository\DemandeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AmiController extends AbstractController
{
    public function __construct(private DemandeRepository $demandeRepository, private EntityManagerInterface $entityManager)
    {

    }

    #[Route('/api/addAmi', name: 'add_ami')]
    public function addAmi(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        try {
            $demande = $this->demandeRepository->find($data['demande']);

            $ami = new Ami();
            $ami->setUser1($demande->getDemandeur());
            $ami->setUser2($demande->getReceveur());
            $ami->setCreatedAt(new \DateTimeImmutable());
            $this->entityManager->persist($ami);
            $this->entityManager->remove($demande);
            $this->entityManager->flush();
            return $this->json(['success' => 'success'], 200);
        } catch (\Exception $exception) {
            return $this->json(['error' => 'fail'], 500);
        }
    }

    #[Route('/api/getAmis', name: 'get_amis')]
    public function getAmis(AmiRepository $amiRepository): Response
    {
        $amis = $amiRepository->findAmis($this->getUser());
        $listAmis = [];
            foreach ($amis as $ami) {
                if ($ami->getUser1() !== $this->getUser()) {
                    $amiToAdd = $ami->getUser1();
                } else {
                    $amiToAdd = $ami->getUser2();
                }
                $listAmis[] = [
                    'id' => $ami->getId(),
                    'ami' => $amiToAdd,
                ];
            }
        return $this->json($listAmis, 200, [], ['groups' => 'getAmis']);
    }
}
