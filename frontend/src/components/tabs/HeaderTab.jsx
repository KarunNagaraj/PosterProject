import { useShallow } from 'zustand/react/shallow';
import { FieldGroup, TextInput, UploadBox, SectionLabel } from '../UI';
import { fileToBase64 } from '../../utils';
import { usePosterStore } from '../../store/usePosterStore';

export default function HeaderTab() {
  const { logoImg, university, dept, campus, tagline, setPosterField } = usePosterStore(
    useShallow((state) => ({
      logoImg: state.poster.logoImg,
      university: state.poster.university,
      dept: state.poster.dept,
      campus: state.poster.campus,
      tagline: state.poster.tagline,
      setPosterField: state.setPosterField,
    }))
  );

  const handleLogo = async (file) => {
    const b64 = await fileToBase64(file);
    setPosterField('logoImg', b64);
  };

  return (
    <>
      <SectionLabel>Institution</SectionLabel>

      <FieldGroup label="Logo">
        <UploadBox
          icon="🏛"
          label="Click to Upload Logo"
          preview={logoImg}
          onChange={handleLogo}
        />
      </FieldGroup>

      <FieldGroup label="University Name">
        <TextInput
          value={university}
          onChange={(value) => setPosterField('university', value)}
          placeholder="e.g. Anna University"
        />
      </FieldGroup>

      <FieldGroup label="Department">
        <TextInput
          value={dept}
          onChange={(value) => setPosterField('dept', value)}
          placeholder="e.g. Dept. of Computer Science"
        />
      </FieldGroup>

      <FieldGroup label="Campus / College">
        <TextInput
          value={campus}
          onChange={(value) => setPosterField('campus', value)}
          placeholder="e.g. CEG Campus, Chennai"
        />
      </FieldGroup>

      <FieldGroup label="Tagline (optional)">
        <TextInput
          value={tagline}
          onChange={(value) => setPosterField('tagline', value)}
          placeholder="e.g. Excellence in Education"
        />
      </FieldGroup>
    </>
  );
}
