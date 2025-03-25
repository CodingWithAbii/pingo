import React from 'react'
import { useLocalSearchParams } from 'expo-router';

function index() {
    
    const params = useLocalSearchParams();
    const id_lekcije = Number(params.id_lekcije);
    const id_vjezbe = Number(params.id_vjezbe);


  return (
    <div> {id_lekcije} - {id_vjezbe} </div>
  )
}

export default index