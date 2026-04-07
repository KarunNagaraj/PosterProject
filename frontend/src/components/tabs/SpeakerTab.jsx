import { useShallow } from 'zustand/react/shallow';
import { FieldGroup, TextInput, UploadBox, SectionLabel } from '../UI';
import { fileToBase64 } from '../../utils';
import { usePosterStore } from '../../store/usePosterStore';

function SpeakerFields({ prefix, label }) {
  const { img, name, title, alumni, setPosterField } = usePosterStore(
    useShallow((state) => ({
      img: state.poster[`${prefix}img`],
      name: state.poster[`${prefix}name`],
      title: state.poster[`${prefix}title`],
      alumni: state.poster[`${prefix}alumni`],
      setPosterField: state.setPosterField,
    }))
  );

  const handlePhoto = async (file) => {
    const b64 = await fileToBase64(file);
    setPosterField(`${prefix}img`, b64);
  };

  return (
    <>
      <SectionLabel>{label}</SectionLabel>

      <FieldGroup label="Photo">
        <UploadBox
          icon="👤"
          label="Upload Photo"
          preview={img}
          onChange={handlePhoto}
        />
      </FieldGroup>

      <FieldGroup label="Name">
        <TextInput
          value={name}
          onChange={(value) => setPosterField(`${prefix}name`, value)}
          placeholder="Dr. Rajesh Kumar"
        />
      </FieldGroup>

      <FieldGroup label="Designation">
        <TextInput
          value={title}
          onChange={(value) => setPosterField(`${prefix}title`, value)}
          placeholder="Associate Professor, IIT Madras"
        />
      </FieldGroup>

      <FieldGroup label="Alumni Details (Year + Degree)">
        <TextInput
          value={alumni}
          onChange={(value) => setPosterField(`${prefix}alumni`, value)}
          placeholder="B.E. CSE '08"
        />
      </FieldGroup>
    </>
  );
}

export default function SpeakerTab() {
  return (
    <>
      <SpeakerFields prefix="sp1" label="Speaker 1" />
      <SpeakerFields prefix="sp2" label="Speaker 2 (optional)" />
    </>
  );
}
