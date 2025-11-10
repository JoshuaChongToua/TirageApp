<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class NoteController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager, private NoteRepository $noteRepository) {

    }

    #[Route('/api/getNotesAndAvis', name: 'get_notes_and_avis', methods: ['POST'])]
    public function getNotesAndAvis(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $res = $this->noteRepository->findBy(['titre_id' => $data['titre_id']]);
        if ($res) {
            return $this->json($res, 200, [], ['groups' => 'note']);
        }
        return $this->json(null, 200, [], ['groups' => 'note']);
    }

    #[Route('/api/addNoteAndAvis', name: 'add_note_and_avis', methods: ['POST'])]
    public function addNoteAndAvis(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $note = new Note();
            $note->setNote($data['note']);
            $note->setTitreId($data['titreId']);
            $note->setUser($this->getUser());
            $note->setCreatedAt(new \DateTimeImmutable());
            if ($data['avis']) {
                $note->setAvis($data['avis']);
            }
            $this->entityManager->persist($note);
            $this->entityManager->flush();
            return $this->json($note, 200, [], ['groups' => ['note']]);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), 500);
        }
    }


}
