<?php

// src/Sdz/ChatBundle/Controller/ChatController.php

namespace Athena\ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class ChatController extends Controller
{
  public function indexAction()
  {
    return $this->render('AthenaChatBundle:Chat:index.html.twig');
  }
}