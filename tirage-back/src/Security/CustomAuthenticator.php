<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\PasswordUpgradeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class CustomAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private UserProviderInterface $userProvider,
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $jwtManager
    ) {}

    public function supports(Request $request): ?bool
    {
        return $request->getPathInfo() === '/api/login_check' && $request->isMethod('POST');
    }

    public function authenticate(Request $request): Passport
    {
        $data = json_decode($request->getContent(), true);
        $userData = $data['email'] ?? null;
        $plainPassword = $data['password'] ?? null;

        // Vérifier si les informations d'authentification sont valides
        if (null === $userData || null === $plainPassword) {
            throw new AuthenticationException('Les champs "username" et "password" doivent être renseignés.');
        }

        // Chargement de l'utilisateur à partir de son email
        $user = $this->userProvider->loadUserByIdentifier($userData);

        if (!$user) {
            throw new AuthenticationException('Utilisateur non trouvé.');
        }

        if (!$this->passwordHasher->isPasswordValid($user, $plainPassword)) {
            throw new AuthenticationException('Mot de passe incorrect.');
        }

        return new SelfValidatingPassport(new UserBadge($userData));
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $user = $token->getUser();
        $jwt = $this->jwtManager->create($user);

        return new Response(
            json_encode([
                'message' => 'Authentication successful!',
                'token' => $jwt,
            ]),
            200,
            ['Content-Type' => 'application/json']
        );
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new Response($exception->getMessage(), Response::HTTP_UNAUTHORIZED);
    }

}
