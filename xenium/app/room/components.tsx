const MessageList = ({ messages }: { messages: ChatMessage[] }) => {
  return (
    <div className="messageList">
      {messages.length >= 1 ? (
        messages.map((message, index) => (
          <div key={index}>
            <strong>{message.userName}:</strong> {message.text}
          </div>
        ))
      ) : (
        <div className="empty">No Message yet...</div>
      )}
    </div>
  )
}

const UserList = ({ users }: { users: RoomUserStatus[] }) => {
  return (
    <div className="userList">
      {users.map((user, index) => (
        <div key={index}>
          <strong>
            <li>{user.name}</li>
          </strong>
        </div>
      ))}
    </div>
  )
}

const InputRow = ({
  inputText,
  setInputText,
  handleSendText,
}: {
  inputText: string
  setInputText: (str: string) => void
  handleSendText: () => void
}) => {
  return (
    <div className="inputRow">
      <input
        type="text"
        value={inputText}
        className="input"
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Let's chat..."
      />
      <button className="button" onClick={handleSendText}>
        Send
      </button>
    </div>
  )
}
export { UserList, MessageList, InputRow }
