<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['get_notes_avis', 'demande', 'info_user', 'getAmis', 'conversation'])]
    private ?int $id = null;

    #[Groups(['get_notes_avis', 'demande', 'info_user', 'getAmis', 'conversation'])]
    #[ORM\Column(length: 180)]
    private ?string $name = null;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['info_user', 'user_view', 'getAmis'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['info_user', 'user_view'])]
    #[ORM\Column(type: 'json')]
    private array $roles = [];

    /**
     * @var Collection<int, Note>
     */
    #[ORM\OneToMany(targetEntity: Note::class, mappedBy: 'user')]
    private Collection $notes;

    /**
     * @var Collection<int, Liste>
     */
    #[ORM\OneToMany(targetEntity: Liste::class, mappedBy: 'user')]
    private Collection $listes;

    /**
     * @var Collection<int, Demande>
     */
    #[ORM\OneToMany(targetEntity: Demande::class, mappedBy: 'demandeur')]
    private Collection $demandes;

    /**
     * @var Collection<int, Ami>
     */
    #[ORM\OneToMany(targetEntity: Ami::class, mappedBy: 'user1')]
    private Collection $amis;

    /**
     * @var Collection<int, Conversation>
     */
    #[ORM\OneToMany(targetEntity: Conversation::class, mappedBy: 'user1')]
    private Collection $conversations;

    /**
     * @var Collection<int, ConversationUser>
     */
    #[ORM\OneToMany(targetEntity: ConversationUser::class, mappedBy: 'user')]
    private Collection $conversationUsers;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'user')]
    private Collection $messages;

    /**
     * @var Collection<int, Conversation>
     */
    #[ORM\OneToMany(targetEntity: Conversation::class, mappedBy: 'createur')]
    private Collection $conversation_createur;


    public function __construct()
    {
        $this->notes = new ArrayCollection();
        $this->listes = new ArrayCollection();
        $this->demandes = new ArrayCollection();
        $this->amis = new ArrayCollection();
        $this->conversations = new ArrayCollection();
        $this->conversationUsers = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->conversation_createur = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }


    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection<int, Note>
     */
    public function getNotes(): Collection
    {
        return $this->notes;
    }

    public function addNote(Note $note): static
    {
        if (!$this->notes->contains($note)) {
            $this->notes->add($note);
            $note->setUser($this);
        }

        return $this;
    }

    public function removeNote(Note $note): static
    {
        if ($this->notes->removeElement($note)) {
            // set the owning side to null (unless already changed)
            if ($note->getUser() === $this) {
                $note->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Liste>
     */
    public function getListes(): Collection
    {
        return $this->listes;
    }

    public function addListe(Liste $liste): static
    {
        if (!$this->listes->contains($liste)) {
            $this->listes->add($liste);
            $liste->setUser($this);
        }

        return $this;
    }

    public function removeListe(Liste $liste): static
    {
        if ($this->listes->removeElement($liste)) {
            // set the owning side to null (unless already changed)
            if ($liste->getUser() === $this) {
                $liste->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Demande>
     */
    public function getDemandes(): Collection
    {
        return $this->demandes;
    }

    public function addDemande(Demande $demande): static
    {
        if (!$this->demandes->contains($demande)) {
            $this->demandes->add($demande);
            $demande->setDemandeur($this);
        }

        return $this;
    }

    public function removeDemande(Demande $demande): static
    {
        if ($this->demandes->removeElement($demande)) {
            // set the owning side to null (unless already changed)
            if ($demande->getDemandeur() === $this) {
                $demande->setDemandeur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Ami>
     */
    public function getAmis(): Collection
    {
        return $this->amis;
    }

    public function addAmi(Ami $ami): static
    {
        if (!$this->amis->contains($ami)) {
            $this->amis->add($ami);
            $ami->setUser1($this);
        }

        return $this;
    }

    public function removeAmi(Ami $ami): static
    {
        if ($this->amis->removeElement($ami)) {
            // set the owning side to null (unless already changed)
            if ($ami->getUser1() === $this) {
                $ami->setUser1(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Conversation>
     */
    public function getConversations(): Collection
    {
        return $this->conversations;
    }

    public function addConversation(Conversation $conversation): static
    {
        if (!$this->conversations->contains($conversation)) {
            $this->conversations->add($conversation);
            $conversation->setUser1($this);
        }

        return $this;
    }

    public function removeConversation(Conversation $conversation): static
    {
        if ($this->conversations->removeElement($conversation)) {
            // set the owning side to null (unless already changed)
            if ($conversation->getUser1() === $this) {
                $conversation->setUser1(null);
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
            $conversationUser->setUser($this);
        }

        return $this;
    }

    public function removeConversationUser(ConversationUser $conversationUser): static
    {
        if ($this->conversationUsers->removeElement($conversationUser)) {
            // set the owning side to null (unless already changed)
            if ($conversationUser->getUser() === $this) {
                $conversationUser->setUser(null);
            }
        }

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
            $message->setUser($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Conversation>
     */
    public function getConversationCreateur(): Collection
    {
        return $this->conversation_createur;
    }

    public function addConversationCreateur(Conversation $conversationCreateur): static
    {
        if (!$this->conversation_createur->contains($conversationCreateur)) {
            $this->conversation_createur->add($conversationCreateur);
            $conversationCreateur->setCreateur($this);
        }

        return $this;
    }

    public function removeConversationCreateur(Conversation $conversationCreateur): static
    {
        if ($this->conversation_createur->removeElement($conversationCreateur)) {
            // set the owning side to null (unless already changed)
            if ($conversationCreateur->getCreateur() === $this) {
                $conversationCreateur->setCreateur(null);
            }
        }

        return $this;
    }


}
