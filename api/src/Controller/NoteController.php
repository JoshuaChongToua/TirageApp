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
            return $this->json($res, 200, [], ['groups' => 'get_notes_avis']);
        }
        return $this->json(null, 200);
    }

    #[Route('/api/getTitreNoted', name: 'get_titre_noted', methods: ['GET'])]
    public function getTitreNoted(): Response
    {
        $res = $this->noteRepository->findBy(['user' => $this->getUser()]);
        if ($res) {
            return $this->json($res, 200, [], ['groups' => 'get_notes_avis']);
        }
        return $this->json(null, 200);
    }

    #[Route('/api/getTitreNotedLimited', name: 'get_titre_noted_limited', methods: ['GET'])]
    public function getTitreNotedLimited(): Response
    {
        $res = $this->noteRepository->findBy(['user' => $this->getUser()],['id' => 'DESC'], 15);
        if ($res) {
            return $this->json($res, 200, [], ['groups' => 'get_notes_avis']);
        }
        return $this->json(null, 200);
    }

    #[Route('/api/hasVoted', name: 'has_voted', methods: ['POST'])]
    public function hasVoted(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $exist = $this->noteRepository->findOneBy(['titre_id' => $data['titreId'], 'user' => $this->getUser()]);
        if ($exist) {
            return $this->json($exist, 200, [], ['groups' => ['note']]);
        }
        return $this->json(false, 200);
    }


    #[Route('/api/getNoteAverage', name: 'get_notes_average', methods: ['POST'])]
    public function getNoteAverage(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $res = $this->noteRepository->findNoteAverage($data['titreId']);
        if ($res) {
            return $this->json($res, 200, [], ['groups' => 'get_notes_avis']);
        }
        return $this->json(null, 200);
    }

    #[Route('/api/getNoteAverageList', name: 'get_notes_average_list', methods: ['POST'])]
    public function getNoteAverageList(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $list = [];
        foreach ($data['titreId'] as $titreId) {
            $list[$titreId] = round($this->noteRepository->findNoteAverage($titreId), 2);
        }
        if ($list) {
            return $this->json($list, 200, [], ['groups' => 'get_notes_avis']);
        }
        return $this->json(null, 200);
    }

    #[Route('/api/addNoteAndAvis', name: 'add_note_and_avis', methods: ['POST'])]
    public function addNoteAndAvis(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $exist = $this->noteRepository->findBy(['titre_id' => $data['titreId'], 'user' => $this->getUser()]);
            if (!$exist) {
                $note = new Note();
                $note->setNote($data['note']);
                $note->setTitreId($data['titreId']);
                $note->setSpoil($data['spoil']);
                $note->setType($data['type']);
                $note->setUser($this->getUser());
                $note->setCreatedAt(new \DateTimeImmutable());
                if ($data['avis']) {
                    $note->setAvis($data['avis']);
                }
                $this->entityManager->persist($note);
                $this->entityManager->flush();
                return $this->json($note, 200, [], ['groups' => ['note']]);
            }
            return $this->editNoteAndAvis($request);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), 500);
        }
    }

    #[Route('/api/editNoteAndAvis', name: 'edit_note_and_avis', methods: ['POST'])]
    public function editNoteAndAvis(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $exist = $this->noteRepository->findOneBy(['titre_id' => $data['titreId'], 'user' => $this->getUser()]);
            $exist->setNote($data['note']);
            $exist->setTitreId($data['titreId']);
            $exist->setSpoil($data['spoil']);
            $exist->setType($data['type']);
            $exist->setUser($this->getUser());
            $exist->setUpdatedAt(new \DateTimeImmutable());
            if ($data['avis']) {
                $exist->setAvis($data['avis']);
            }
            $this->entityManager->persist($exist);
            $this->entityManager->flush();
            return $this->json($exist, 200, [], ['groups' => ['note']]);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), 500);
        }
    }


}
