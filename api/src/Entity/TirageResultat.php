<?php

namespace App\Entity;

use App\Repository\TirageResultatRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TirageResultatRepository::class)]
class TirageResultat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['mes_parties_view'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'tirageResultats', targetEntity: User::class)]
    #[Groups(['mes_parties_view'])]
    private ?user $joueur = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'tiragesEnTantQueDestinataire')]
    #[Groups(['mes_parties_view'])]
    private ?User $destinataire = null;

    #[ORM\ManyToOne(inversedBy: 'tirageResultats', targetEntity: Partie::class)]
    private ?partie $partie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJoueur(): ?user
    {
        return $this->joueur;
    }

    public function setJoueur(?user $joueur): static
    {
        $this->joueur = $joueur;

        return $this;
    }

    public function getDestinataire(): ?user
    {
        return $this->destinataire;
    }

    public function setDestinataire(?user $destinataire): static
    {
        $this->destinataire = $destinataire;

        return $this;
    }

    public function getPartie(): ?partie
    {
        return $this->partie;
    }

    public function setPartie(?partie $parti): static
    {
        $this->partie = $parti;

        return $this;
    }
}
