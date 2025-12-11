<?php

namespace App\Entity;

use App\Repository\ConversationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ConversationRepository::class)]
class Conversation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['conversation'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['conversation'])]
    private ?string $nom = null;

    #[ORM\Column]
    #[Groups(['conversation'])]
    private ?\DateTimeImmutable $created_at = null;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'conversation')]
    #[Groups(['conversation'])]
    private Collection $messages;

    /**
     * @var Collection<int, ConversationUser>
     */
    #[ORM\OneToMany(targetEntity: ConversationUser::class, mappedBy: 'conversation')]
    private Collection $conversationUsers;

    #[ORM\ManyToOne(inversedBy: 'conversation_createur')]
    #[Groups(['conversation'])]
    private ?User $createur = null;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->conversationUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

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

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setConversation($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getConversation() === $this) {
                $message->setConversation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ConversationUser>
     */
    public function getConversationUsers(): Collection
    {
        return $this->conversationUsers;
    }

    public function addConversationUser(ConversationUser $conversationUser): static
    {
        if (!$this->conversationUsers->contains($conversationUser)) {
            $this->conversationUsers->add($conversationUser);
            $conversationUser->setConversation($this);
        }

        return $this;
    }

    public function removeConversationUser(ConversationUser $conversationUser): static
    {
        if ($this->conversationUsers->removeElement($conversationUser)) {
            // set the owning side to null (unless already changed)
            if ($conversationUser->getConversation() === $this) {
                $conversationUser->setConversation(null);
            }
        }

        return $this;
    }

    public function getCreateur(): ?User
    {
        return $this->createur;
    }

    public function setCreateur(?User $createur): static
    {
        $this->createur = $createur;

        return $this;
    }
}
