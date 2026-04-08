import { useShallow } from 'zustand/react/shallow';
import { FieldGroup, TextInput, UploadBox, SectionLabel, Button } from '../UI';
import { fileToBase64 } from '../../utils';
import { usePosterStore } from '../../store/usePosterStore';

function SpeakerFields({ speaker, index, onRemove, canRemove }) {
  const { setSpeakerField } = usePosterStore(
    useShallow((state) => ({
      setSpeakerField: state.setSpeakerField,
    }))
  );

  const handlePhoto = async (file) => {
    const b64 = await fileToBase64(file);
    setSpeakerField(speaker.id, 'img', b64);
  };

  return (
    <>
      <SectionLabel>{`Speaker ${index + 1}`}</SectionLabel>

      <FieldGroup label="Photo">
        <UploadBox
          icon="👤"
          label="Upload Photo"
          preview={speaker.img}
          onChange={handlePhoto}
        />
      </FieldGroup>

      <FieldGroup label="Role / Label">
        <TextInput
          value={speaker.role}
          onChange={(value) => setSpeakerField(speaker.id, 'role', value)}
          placeholder="Chief Guest / Speaker / Guest of Honour"
        />
      </FieldGroup>

      <FieldGroup label="Name">
        <TextInput
          value={speaker.name}
          onChange={(value) => setSpeakerField(speaker.id, 'name', value)}
          placeholder="Dr. Rajesh Kumar"
        />
      </FieldGroup>

      <FieldGroup label="Designation">
        <TextInput
          value={speaker.title}
          onChange={(value) => setSpeakerField(speaker.id, 'title', value)}
          placeholder="Associate Professor, IIT Madras"
        />
      </FieldGroup>

      <FieldGroup label="Additional Details">
        <TextInput
          value={speaker.details}
          onChange={(value) => setSpeakerField(speaker.id, 'details', value)}
          placeholder="Department / Organisation / Alumni / City"
        />
      </FieldGroup>

      {canRemove ? (
        <Button variant="ghost" onClick={onRemove}>
          Remove Speaker
        </Button>
      ) : null}
    </>
  );
}

export default function SpeakerTab() {
  const { speakers, addSpeaker, removeSpeaker } = usePosterStore(
    useShallow((state) => ({
      speakers: state.poster.speakers,
      addSpeaker: state.addSpeaker,
      removeSpeaker: state.removeSpeaker,
    }))
  );

  return (
    <>
      {speakers.map((speaker, index) => (
        <SpeakerFields
          key={speaker.id}
          speaker={speaker}
          index={index}
          canRemove={speakers.length > 1}
          onRemove={() => removeSpeaker(speaker.id)}
        />
      ))}

      <Button variant="primary" onClick={addSpeaker}>
        Add Speaker
      </Button>
    </>
  );
}
