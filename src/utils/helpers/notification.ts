import Swal from "sweetalert2";

export const errorNotification = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#EEE7DE",
    color: "#000000",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "error",
    title: message
  });
}


export const successNotification = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    background: "#EEE7DE",
    color: "#000000",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: message
  });
}

export const successNotificationWithAction = (message: string, action: any) => {
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "center",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   background : "#3D3759",
  //   color: "#fff",
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.onmouseenter = Swal.stopTimer;
  //     toast.onmouseleave = Swal.resumeTimer;
  //   }
  // });
  Swal.fire({
    icon: "success",
    title: message,
    background: "#EEE7DE",
    color: "#000000",
    confirmButtonText: "Regresar",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      action();
    }
  });
}