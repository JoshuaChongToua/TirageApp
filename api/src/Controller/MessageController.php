<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MessageController extends AbstractController
{
    public function __construct(private MessageRepository $messageRepository, private EntityManagerInterface $entityManager, private ConversationRepository $conversationRepository)
    {

    }
    #[Route('/api/createMessage', name: 'create_message')]
    public function createMessage(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        try {
            foreach ($data['conversationIds'] as $conversationId) {
                $conversation = $this->conversationRepository->findOneBy(['id' => $conversationId]);
                $message = new Message();
                $message->setConversation($conversation);
                $message->setMessage($data['message']);
                if (isset($data['titreId'])) {
                    $message->setTitreId($data['titreId']);
                    $message->setTypeTitre($data['typeTitre']);
                }
                $message->setCreatedAt(new \DateTimeImmutable());
                $message->setUser($this->getUser());
                $this->entityManager->persist($message);
            }
            $this->entityManager->flush();
            return $this->json("success", 200);
        } catch (\Exception $exception) {
            return $this->json("error", 400);
        }
    }

    #[Route('/api/getMessagesConversation/{id}', name: 'get_messages_conversation')]
    public function getMessagesConversation(Conversation $conversation): Response
    {
        return $this->json($conversation->getMessages(), 200, [], ['groups' => 'conversation']);
    }

}
