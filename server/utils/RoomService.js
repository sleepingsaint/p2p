const {v4: uuid4} = require("uuid")
class RoomService {
	constructor() {
		this.rooms = [];
	}

	createRoom() {
		const roomId = uuid4();
		this.rooms.push({
			id: roomId
		})
		return roomId;
	}
}