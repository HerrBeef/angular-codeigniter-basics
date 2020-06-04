<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authentification extends CI_Controller {
	public function __construct() {
        parent::__construct();
		$this->load->library(array('Aauth','session','form_validation'));
		$this->load->helper(array('form', 'url', 'date'));
	}

	public function login()
	{
		$parameters = json_decode($this->input->raw_input_stream);

		$username = isset($parameters->username)? $parameters->username : '';
        $password = isset($parameters->password)? $parameters->password : '';
		
		if ($this->aauth->login($username, $password))
		{
			$permissions = array();

			foreach($this->aauth->list_perms() as $permission){
				if($this->aauth->is_allowed($permission->name, $this->aauth->get_user_id())) {
					$permission = array('id' => $permission->id, 'name' => $permission->name, 'definition' => $permission->definition, 'value' => true);
					array_push($permissions, $permission);
				}
				else {
					$permission = array('id' => $permission->id, 'name' => $permission->name, 'definition' => $permission->definition, 'value' => false);
					array_push($permissions, $permission);
				}
			}

			echo json_encode(array('success' => true, 'permissions' => $permissions));
		}
		else {
			echo json_encode(array('success' => false, 'error' => $this->aauth->get_errors_array()[0]));
		}
	}
	
	public function checkloggedin()
    {
        if($this->aauth->is_loggedin()){
			echo json_encode(array('success' => true));
		}
		else {
			echo json_encode(array('success' => false));
		}
	}
	
	public function logout()
    {
        $this->aauth->logout();
		echo json_encode(array('success' => true));
	}

	public function createtestuser(){
		if($this->aauth->create_user('test@flootly.com', 'test1234', 'test')) {
			echo json_encode(array('success' => true));
		}
		else {
			echo json_encode(array('success' => false, 'error' => $this->aauth->get_errors_array()[0]));
		}
	}

	public function getpermissions() {
		if(!$this->aauth->is_loggedin()){
			echo json_encode(array('success' => false, 'error' => "Keine Berechtigung"));
			return;
		}

		$permissions = array();
		foreach($this->aauth->list_perms() as $permission){
			if($this->aauth->is_allowed($permission->name, $this->aauth->get_user_id())) {
				$permission = array('id' => $permission->id, 'name' => $permission->name, 'definition' => $permission->definition, 'value' => true);
				array_push($permissions, $permission);
			}
			else {
				$permission = array('id' => $permission->id, 'name' => $permission->name, 'definition' => $permission->definition, 'value' => false);
				array_push($permissions, $permission);
			}
		}

		echo json_encode(array('success' => true, 'permissions' => $permissions));
	}
}
