<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserRoleType;
use App\Form\UserType;
use App\Repository\AmiRepository;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


class UserController extends AbstractController
{

    public function __construct(private UserRepository $userRepository)
    {

    }

    #[Route('/api/userConnected', name: 'app_user_connected')]
    public function userConnected(): Response
    {
        return $this->json($this->getUser(), 200, [], ['groups' => 'info_user']);
    }


    #[Route('/api/getUsers', name: 'get_users')]
    public function getUsers(Request $request, AmiRepository $amiRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $users = $this->userRepository->findUserByName($data['name']);
        $mesDemandes = $this->getUser()->getDemandes();
        $amis = $amiRepository->findAmis($this->getUser());
        $listUsers = [];
        foreach ($users as $user) {
            $demande = false;
            $isAmi = false;
            if ($this->getUser() === $user) {
                continue;
            }
            if ($amis) {
                foreach ($amis as $ami) {
                    if ($ami->getUser1() === $user || $ami->getUser2() === $user) {
                        $isAmi = true;
                    }
                }
            }
            foreach ($mesDemandes as $maDemande) {
                if ($maDemande->getReceveur()->getId() === $user->getId()) {
                    $demande = true;
                    break;
                }
            }
            $listUsers[] = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'demande' => $demande,
                'ami' => $isAmi
            ];
        }
        return $this->json($listUsers, 200);
    }

    #[Route('/user', name: 'app_user')]
    #[IsGranted('ROLE_USER')]
    public function index(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
            'users' => $users
        ]);
    }

    #[Route('/user/create', name: 'user_create')]
    public function create(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher, RoleRepository $roleRepository): Response
    {

        $roleUser = $roleRepository->findOneBy(["name" => 'user']) ;
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest(($request));
        if ($form->isSubmitted() && $form->isValid()) {
            $user->setPassword($hasher->hashPassword($user, $user->getPassword()));
            $user->setRole($roleUser);
            $em->persist($user);
            $em->flush();
            $this->addFlash('success', 'Creation Réussie');
            return $this->redirectToRoute('app_user');
        }
        return $this->render('user/create.html.twig', [
            'form' => $form
        ]);
    }

    #[Route('/user/view/{id}', name: 'user_view')]
    public function view(UserRepository $userRepo, $id): Response
    {

        $user = $userRepo->find($id);
        return $this->render('user/view.html.twig', [
            'user' => $user
        ]);
    }


    #[Route('/user/{id}/edit', name: 'userRole_edit')]
    public function editRole(User $user, Request $request, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(UserRoleType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            $this->addFlash('success', 'Modification Réussie');
            return $this->redirectToRoute('app_user');
        }
        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form
        ]);
    }

    #[Route('/user/{id}/edit', name: 'user_edit')]
    public function edit(User $user, Request $request, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            $this->addFlash('success', 'Modification Réussie');
            return $this->redirectToRoute('app_user');
        }
        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form
        ]);
    }

    #[Route('/user/{id}', name: 'user_delete', methods: ['DELETE'])]
    public function remove(User $user, EntityManagerInterface $em)
    {
        $em->remove($user);
        $em->flush();
        $this->addFlash('success', 'Suppression Réussie');
        return $this->redirectToRoute('app_user');
    }

    
}
