<?php

namespace Athena\ChatBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Conversation
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Athena\ChatBundle\Entity\ConversationRepository")
 */
class Conversation {

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="Athena\ChatBundle\Entity\UtilisateurConversation",
     * mappedBy="conversation")
     */
    private $utilisateurs;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->utilisateurs = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add utilisateurs
     *
     * @param \Athena\ChatBundle\Entity\UtilisateurConversation $utilisateurs
     * @return Conversation
     */
    public function addUtilisateur(\Athena\ChatBundle\Entity\UtilisateurConversation $utilisateurs)
    {
        $this->utilisateurs[] = $utilisateurs;

        return $this;
    }

    /**
     * Remove utilisateurs
     *
     * @param \Athena\ChatBundle\Entity\UtilisateurConversation $utilisateurs
     */
    public function removeUtilisateur(\Athena\ChatBundle\Entity\UtilisateurConversation $utilisateurs)
    {
        $this->utilisateurs->removeElement($utilisateurs);
    }

    /**
     * Get utilisateurs
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUtilisateurs()
    {
        return $this->utilisateurs;
    }
}
