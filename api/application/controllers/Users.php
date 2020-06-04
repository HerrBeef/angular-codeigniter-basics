<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {
	public function __construct() {
        parent::__construct();
		$this->load->library(array('Aauth','session','form_validation'));
		$this->load->helper(array('form', 'url', 'date'));
	}

	public function get($userid = false)
	{
		if($userid != false && $this->aauth->is_allowed('getuser')) {
			$user = $this->aauth->get_user($userid);

			echo json_encode(array('success' => true, 'user' => $user));
		}
		else if($this->aauth->is_allowed('getuserlist')) {
			$users = $this->aauth->list_users();

			echo json_encode(array('success' => true, 'users' => $users));
		}
		else {
			echo json_encode(array('success' => false, 'error' => "Keine Berechtigung"));
		}
	}
}
