<?php

namespace App\Entity;

use App\Repository\NoteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: NoteRepository::class)]
class Note
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['note', 'get_notes_avis'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['note', 'get_notes_avis'])]
    private ?int $note = null;

    #[ORM\Column]
    #[Groups(['note', 'get_notes_avis'])]
    private ?int $titre_id = null;

    #[ORM\ManyToOne(inversedBy: 'notes')]
    #[Groups(['get_notes_avis'])]
    private ?user $user = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['note', 'get_notes_avis'])]
    private ?string $avis = null;

    #[ORM\Column]
    #[Groups(['note', 'get_notes_avis'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['note', 'get_notes_avis'])]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\Column]
    #[Groups(['note', 'get_notes_avis'])]
    private ?bool $spoil = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

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

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getAvis(): ?string
    {
        return $this->avis;
    }

    public function setAvis(?string $avis): static
    {
        $this->avis = $avis;

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

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function isSpoil(): ?bool
    {
        return $this->spoil;
    }

    public function setSpoil(bool $spoil): static
    {
        $this->spoil = $spoil;

        return $this;
    }
}
