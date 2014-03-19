<?php

// src/Sdz/ChatBundle/Controller/ChatController.php

namespace Athena\ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class ChatController extends Controller
{
  public function indexAction()
  {
        $repository = $this->getDoctrine()
                   ->getManager()
                   ->getRepository('AthenaChatBundle:Utilisateur');

        $listeUtilisateurs = $repository->findAll();

        return $this->render('AthenaChatBundle:Chat:index.html.twig', array(
            'listeUtilisateurs' => $listeUtilisateurs
        ));
  }
}