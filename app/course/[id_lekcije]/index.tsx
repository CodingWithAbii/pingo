import { useAuth } from '@/components/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react'
import { Text } from 'react-native';

interface NavigationParams extends Record<string, string> {
    id_lekcije: string;
    id_vjezbe: string;
  }

function index() {
    const { user, profile } = useAuth();
    const params = useLocalSearchParams();
    const id_lekcije = Number(params.id_lekcije);

    useEffect(()=> {
        const fetchLessons = async () => {
            
            const { data, error } = await supabase.rpc('get_next_exercise', {
                p_user_id: user?.id,
                p_idodlekcije: id_lekcije
              });

              if (error) {
                console.error('Error fetching lessons:', error);
              } else {
                console.log(data)
                if(data.length > 0){
                    
                    const params: NavigationParams = {
                        id_lekcije: id_lekcije.toString(),
                        id_vjezbe:(data[0].vjezba_id).toString() 
                      };
                    router.replace({
                        pathname: '/course/[id_lekcije]/lesson/[id_vjezbe]',
                        params
                    })
                } else {
                  router.replace(`/home`)
                }
              }
            
        };

        fetchLessons();
    }, [id_lekcije])

    return null
}

export default index