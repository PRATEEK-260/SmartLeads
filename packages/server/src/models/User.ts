import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@service-hive/shared';

export interface IUserDocument extends Omit<IUser, 'id'>, mongoose.Document {
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'Sales'],
      default: 'Sales',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Set first user as Admin
  if (this.isNew) {
    const userCount = await mongoose.model('User').countDocuments();
    if (userCount === 0) {
      this.role = 'Admin';
    }
  }

  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
