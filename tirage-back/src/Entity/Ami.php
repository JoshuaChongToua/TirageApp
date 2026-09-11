<?php

namespace App\Entity;

use App\Repository\AmiRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AmiRepository::class)]
class Ami
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getAmis'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'amis')]
    #[Groups(['getAmis'])]
    private ?User $user1 = null;

    #[ORM\ManyToOne(inversedBy: 'amis')]
    #[Groups(['getAmis'])]
    private ?User $user2 = null;

    #[ORM\Column]
    #[Groups(['getAmis'])]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser1(): ?User
    {
        return $this->user1;
    }

    public function setUser1(?User $user1): static
    {
        $this->user1 = $user1;

        return $this;
    }

    public function getUser2(): ?User
    {
        return $this->user2;
    }

    public function setUser2(?User $user2): static
    {
        $this->user2 = $user2;

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
