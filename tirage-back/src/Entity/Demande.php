<?php

namespace App\Entity;

use App\Repository\DemandeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DemandeRepository::class)]
class Demande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['demande'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'demandes')]
    #[Groups(['demande'])]
    private ?User $demandeur = null;

    #[ORM\ManyToOne(inversedBy: 'demandes')]
    #[Groups(['demande'])]
    private ?User $receveur = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDemandeur(): ?User
    {
        return $this->demandeur;
    }

    public function setDemandeur(?User $demandeur): static
    {
        $this->demandeur = $demandeur;

        return $this;
    }

    public function getReceveur(): ?User
    {
        return $this->receveur;
    }

    public function setReceveur(?User $receveur): static
    {
        $this->receveur = $receveur;

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
}
