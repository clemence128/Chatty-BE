import { Model, Schema, model } from "mongoose";
import { IConservationDocument } from "~/interfaces/conservation.interface";


const ConservationSchema = new Schema<IConservationDocument>({
    name: {
        type: String,
        default: "",
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    users: {
        type: [Schema.Types.ObjectId],
        default: []
    },

    isGroup: {
        type: Boolean,
        default: false,
    },

    latestMessage: {
        type: Schema.Types.ObjectId,
        default: ''
    },

}, {timestamps: true})


const ConservationModel: Model<IConservationDocument> = model<IConservationDocument>('Conservation', ConservationSchema)

export default ConservationModel