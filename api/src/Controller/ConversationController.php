<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Repository\ConversationRepository;
use App\Repository\ConversationUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ConversationController extends AbstractController
{
    public function __construct(private ConversationRepository $conversationRepository, private EntityManagerInterface $entityManager, private ConversationUserRepository $conversationUserRepository)
    {

    }
    #[Route('/api/createConversation', name: 'create_conversation')]
    public function createConversation(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        try {
            $conversation = new Conversation();
            $conversation->setNom($data['nom']);
            $conversation->setCreatedAt(new \DateTimeImmutable());
            $conversation->setCreateur($this->getUser());
            $this->entityManager->persist($conversation);
            $this->entityManager->flush();
            return $this->json('success', 200);
        } catch (\Exception $exception) {
            return $this->json('error', 400);
        }
    }

    #[Route('/api/getMessageFromConversation/{id}', name: 'get_message_from_conversation', methods: ['GET'])]
    public function getMessageFromConversation(Conversation $conversation): Response
    {
        $messages = $conversation->getMessages();
        if ($messages) {
            return $this->json($messages, 200, [], ['groups' => 'message']);
        }
        return $this->json('error', 400);
    }

    #[Route('/api/getConversationUser', name: 'get_conversation_user', methods: ['GET'])]
    public function getConversationUser(): Response
    {
        $conversationsUser = $this->getUser()->getConversationUsers();
        $listConversationsId = [];
        foreach ($conversationsUser as $conversation) {
            $conversationToAdd = $this->conversationUserRepository->findUserConversation($conversation->getConversation()->getId(), $this->getUser()->getId());
            if (!empty($conversationToAdd)) {
                $listConversationsId[] = $conversationToAdd;
            }
        }
        if ($listConversationsId) {
            return $this->json($listConversationsId, 200, [], ['groups' => 'conversation']);
        }

        return $this->json('error', 400);
    }
}
