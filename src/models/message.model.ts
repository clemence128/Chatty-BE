import { Model, Schema, model } from "mongoose";
import { IMessageDocument } from "~/interfaces/message.interface";

const MessageSchema = new Schema<IMessageDocument>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    conservation: {
        type: Schema.Types.ObjectId,
        ref: "ConservationModel"
    },

    content: {
        type: String,
        default: ''
    },

    files: {
        type: Array,
        default: []
    },

    reads: {
        type: Array,
        default: []
    },

    isDeleted: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
})


const MessageModel: Model<IMessageDocument> = model<IMessageDocument>("Message", MessageSchema);

export default MessageModel;