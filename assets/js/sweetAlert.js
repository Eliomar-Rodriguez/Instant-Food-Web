/**
 * Created by Andres on 11/19/2017.
 */
//funcion para mostrar notificaciones al usuario, un uno es error , 2 success, 3 mensaje normal
function mostrarNotificacion(texto,num)
{
    if (num===1)  //error
    {
        swal({ //
            title: texto,
            type: "error",
            confirmButtonColor: "#EE2049",
            timer: 3000,
            showConfirmButton: false
        });
    }
    else if (num===2) //exito en la operacion
    {
        swal({ //
            title: texto,
            type: "success",
            confirmButtonColor: "#27F034",
            timer: 2000,
            showConfirmButton: false
        });
    }

    else
    {
        swal({ //
            title: texto,
            type: "warning",
            confirmButtonColor: "#27F034",
            timer: 2000,
            showConfirmButton: false
        });

    }
}