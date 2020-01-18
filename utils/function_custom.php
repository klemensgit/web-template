<?php

function showData(){
	$html = '';
    $data = DBqueries::getData();
    $count = sizeof($data);
    
    if($count<1){
        return "No data";
    }

	for($i=0; $i<$count; $i++){	
		$html .= '<p>'.$data[$i]["title"].'</p>';   
    }

    return $html;
}

?>