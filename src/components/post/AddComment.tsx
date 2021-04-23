import React, { FormEvent, RefObject, useState } from 'react';
import { FIREBASE_COLLECTION_PHOTOS } from '../../constants/collections';
import useFirebaseContext from '../../hooks/context/useFirebaseContext';
import useUserContext from '../../hooks/context/useUserContext';
import { Comment } from '../../interfaces/firebase';

interface AddCommentProps {
  docId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  commentInput: RefObject<HTMLInputElement>;
}

const AddComment: React.FC<AddCommentProps> = ({
  docId,
  commentInput,
  comments,
  setComments,
}) => {
  const [comment, setComment] = useState<string>('');
  const { firebase, FieldValue } = useFirebaseContext();
  const { user } = useUserContext();

  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      setComments([
        { displayName: user.displayName || '', comment },
        ...comments,
      ]);

      firebase
        .firestore()
        .collection(FIREBASE_COLLECTION_PHOTOS)
        .doc(docId)
        .update({
          comments: FieldValue.arrayUnion({
            displayName: user.displayName || '',
            comment,
          }),
        })
        .finally(() => {
          setComment('');
        });
    }
  };

  return (
    <div className='border-t border-gray-primary'>
      <form
        className='flex justify-between pl-0 pr-5'
        onSubmit={(event) =>
          comments.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Add a comment ...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type='submit'
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
