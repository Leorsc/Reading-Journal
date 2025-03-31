export default function Notification({ type, message }) {
  return (
    <div className={`notification-${type}`}>
      {message}
    </div>
  );
};
