<?php

namespace App\Controller;

use App\Entity\Partie;
use App\Entity\Restriction;
use App\Form\RestrictionType;
use App\Repository\RestrictionRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class RestrictionController extends AbstractController
{
    #[Route('/restriction', name: 'app_restriction')]
    public function index(): Response
    {
        return $this->render('restriction/index.html.twig', [
            'controller_name' => 'RestrictionController',
        ]);
    }

    #[Route('/api/mesParties/{id}/restrictions', name: 'get_restriction')]
    public function getRestrictions(Partie $partie, RestrictionRepository $restrictionRepository, Request $request, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        $restrictions = $restrictionRepository->findBy(['partie' => $partie]);

        return $this->json(['restrictions' => $restrictions], 200, [], ['groups' => 'restrictions']);

    }

    #[Route('/api/mesParties/{id}/restriction/create', name: 'partie_restriction')]
    public function addRestriction(Partie $partie, Request $request, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $joueur = $userRepository->find($data['joueur']);
        $interdit = $userRepository->find($data['interdit']);
        
        $restriction = new Restriction();
        $restriction->setPartie($partie);
        $restriction->setJoueur($joueur);
        $restriction->setInterdit($interdit);

        $em->persist($restriction);
        $em->flush();


        return $this->json(['success' => 'restriction ajoutée avec succès']);
    }

    #[Route('/api/mesParties/{id}/restriction/{idRestriction}', name: 'partie_restriction_delete', methods: ['DELETE'])]
    public function delete(RestrictionRepository $restrictionRepository, int $idRestriction, Partie $partie, EntityManagerInterface $em)
    {
        $restriction = $restrictionRepository->find($idRestriction);
        $em->remove($restriction);
        $em->flush();

        return $this->json(['success' => 'restriction supprimée avec succès']);
    }
}
