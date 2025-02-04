import "bootstrap/dist/css/bootstrap.min.css";

interface InfoProps {
    text: string;
    visible: boolean;
    error: boolean;
  }
  
  export function Info(props: InfoProps) {
    if (!props.visible) return null;
  
    return (
      <div className={props.error ? "text-danger" : "text-success"}>
        <h5>{props.text}</h5>
      </div>
    );
  }
  