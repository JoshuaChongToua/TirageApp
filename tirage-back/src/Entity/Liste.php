<?php

namespace App\Entity;

use App\Repository\ListeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ListeRepository::class)]
class Liste
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['liste'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['liste'])]
    private ?int $titre_id = null;

    #[ORM\ManyToOne(inversedBy: 'listes')]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups(['liste'])]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['liste'])]
    private ?\DateTimeImmutable $added_at = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getAddedAt(): ?\DateTimeImmutable
    {
        return $this->added_at;
    }

    public function setAddedAt(\DateTimeImmutable $added_at): static
    {
        $this->added_at = $added_at;

        return $this;
    }
}
