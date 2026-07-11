import styles from "./UserInfo.module.scss";
import PersonIcon from "@mui/icons-material/Person";

export const UserInfo = ({
  avatarUrl,
  firstName,
  lastName,
  additionalText,
}) => {
  return (
    <div className={styles.root}>
      {avatarUrl ? (
        <img
          className={styles.avatar}
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
        />
      ) : (
        <PersonIcon />
      )}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{`${firstName} ${lastName}`}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
