<?php

namespace Athena\ChatBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UtilisateurConversation
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Athena\ChatBundle\Entity\UtilisateurConversationRepository")
 */
class UtilisateurConversation {

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Athena\ChatBundle\Entity\Utilisateur",
     * inversedBy="conversations")
     */
    private $utilisateur;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Athena\ChatBundle\Entity\Conversation",
     * inversedBy="utilisateurs")
     */
    private $conversation;

    /**
     * @var boolean
     *
     * @ORM\Column(name="isActive", type="boolean")
     */
    private $isActive;


    /**
     * Set isActive
     *
     * @param boolean $isActive
     * @return UtilisateurConversation
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean 
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * Set utilisateur
     *
     * @param \Athena\ChatBundle\Entity\Utilisateur $utilisateur
     * @return UtilisateurConversation
     */
    public function setUtilisateur(\Athena\ChatBundle\Entity\Utilisateur $utilisateur)
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    /**
     * Get utilisateur
     *
     * @return \Athena\ChatBundle\Entity\Utilisateur 
     */
    public function getUtilisateur()
    {
        return $this->utilisateur;
    }

    /**
     * Set conversation
     *
     * @param \Athena\ChatBundle\Entity\Conversation $conversation
     * @return UtilisateurConversation
     */
    public function setConversation(\Athena\ChatBundle\Entity\Conversation $conversation)
    {
        $this->conversation = $conversation;

        return $this;
    }

    /**
     * Get conversation
     *
     * @return \Athena\ChatBundle\Entity\Conversation 
     */
    public function getConversation()
    {
        return $this->conversation;
    }
}
