<?php

namespace Athena\ChatBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Utilisateur
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Athena\ChatBundle\Entity\UtilisateurRepository")
 */
class Utilisateur
{
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
     * mappedBy="utilisateur")
     */
    private $conversations;

    /**
     * @var string
     *
     * @ORM\Column(name="login", type="string", length=100, unique=true)
     */
    private $login;

    /**
     * @var string
     *
     * @ORM\Column(name="mdp", type="string", length=255)
     */
    private $mdp;

    /**
     * @var boolean
     *
     * @ORM\Column(name="connected", type="boolean")
     */
    private $isConnected;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->conversations = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set login
     *
     * @param string $login
     * @return Utilisateur
     */
    public function setLogin($login)
    {
        $this->login = $login;

        return $this;
    }

    /**
     * Get login
     *
     * @return string 
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * Set mdp
     *
     * @param string $mdp
     * @return Utilisateur
     */
    public function setMdp($mdp)
    {
        $this->mdp = $mdp;

        return $this;
    }

    /**
     * Get mdp
     *
     * @return string 
     */
    public function getMdp()
    {
        return $this->mdp;
    }

    /**
     * Set isConnected
     *
     * @param boolean $isConnected
     * @return Utilisateur
     */
    public function setIsConnected($isConnected)
    {
        $this->isConnected = $isConnected;

        return $this;
    }

    /**
     * Get isConnected
     *
     * @return boolean 
     */
    public function getIsConnected()
    {
        return $this->isConnected;
    }

    /**
     * Add conversations
     *
     * @param \Athena\ChatBundle\Entity\UtilisateurConversation $conversations
     * @return Utilisateur
     */
    public function addConversation(\Athena\ChatBundle\Entity\UtilisateurConversation $conversations)
    {
        $this->conversations[] = $conversations;

        return $this;
    }

    /**
     * Remove conversations
     *
     * @param \Athena\ChatBundle\Entity\UtilisateurConversation $conversations
     */
    public function removeConversation(\Athena\ChatBundle\Entity\UtilisateurConversation $conversations)
    {
        $this->conversations->removeElement($conversations);
    }

    /**
     * Get conversations
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getConversations()
    {
        return $this->conversations;
    }
}
