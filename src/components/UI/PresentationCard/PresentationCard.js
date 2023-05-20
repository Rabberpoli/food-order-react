import classes from "./PresentationCard.module.css";

function PresentationCard(props) {
  return (
    <div className={classes.container}>
      <h2 className={classes["title"]}> {props.title}</h2>
      <p className={classes.content}> {props.content}</p>
    </div>
  );
}

export default PresentationCard;
