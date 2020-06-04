<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Movie_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function getmovies($movieId = false, $movieName = false)
    {
        $this->db->select('*');
        $this->db->from('movies');

        if($movieId != false) 
        {
            $this->db->where('id', $featureId);
        }
        if($movieName != false)
        {
            $this->db->where('name', $featurename);
        }

        $query=$this->db->get();
        $result = $query->result();
        $this->db->reset_query();

        if(!isset($result))
        {
            log_message('error', "Database error for getting movies");
        }
        return $result;
    }

    public function createmovie($name, $description, $releasedate)
    {
		if(empty($name) || empty($releasedate)) {
            return false;
		}
		
        $movie = array(
            'name' => $name,
            'description' => $description,
            'releasedate' => $releasedate
        );

        if(!$this->db->insert('movies', $movie)) {
            log_message('error', 'Insert Error');
            return false;
        }
        return true;
    }
}
