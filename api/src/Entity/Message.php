<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['message'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['message', 'conversation'])]
    private ?string $message = null;

    #[ORM\Column]
    #[Groups(['message', 'conversation'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    private ?Conversation $conversation = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[Groups(['message', 'conversation'])]
    private ?User $user = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['message', 'conversation'])]
    private ?int $titre_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['message', 'conversation'])]
    private ?string $type_titre = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getConversation(): ?Conversation
    {
        return $this->conversation;
    }

    public function setConversation(?Conversation $conversation): static
    {
        $this->conversation = $conversation;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getTitreId(): ?int
    {
        return $this->titre_id;
    }

    public function setTitreId(int $titre_id): static
    {
        $this->titre_id = $titre_id;

        return $this;
    }

    public function getTypeTitre(): ?string
    {
        return $this->type_titre;
    }

    public function setTypeTitre(string $type_titre): static
    {
        $this->type_titre = $type_titre;

        return $this;
    }
}
