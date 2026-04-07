import { useShallow } from 'zustand/react/shallow';
import { FieldGroup, TextInput, Select, Row2, SectionLabel } from '../UI';
import { SDG_OPTIONS,CATEGORIES } from '../../constants';
import { usePosterStore } from '../../store/usePosterStore';

export default function EventTab() {
  const {
    category,
    title,
    subtitle,
    date,
    time,
    venue,
    audience,
    reglink,
    showQR,
    setPosterField,
    applyCategoryTheme,
    sdgs,
  } = usePosterStore(
    useShallow((state) => ({
      category: state.poster.category,
      title: state.poster.title,
      subtitle: state.poster.subtitle,
      date: state.poster.date,
      time: state.poster.time,
      venue: state.poster.venue,
      audience: state.poster.audience,
      reglink: state.poster.reglink,
      showQR: state.poster.showQR,
      setPosterField: state.setPosterField,
      applyCategoryTheme: state.applyCategoryTheme,
      sdgs: state.poster.sdgs,
    }))
  );

  const handleCategory = (val) => {
    setPosterField('category', val);
    applyCategoryTheme(val);
  };
  const handleSDGChange = (value) => {
      let updated = [...sdgs];

      if (updated.includes(value)) {
        // remove if already selected
        updated = updated.filter((v) => v !== value);
      } else {
        // add if less than 3
        if (updated.length < 3) {
          updated.push(value);
        }
      }

      setPosterField('sdgs', updated);
    };

  return (
    <>
      <SectionLabel>Event Info</SectionLabel>

      <FieldGroup label="Event Category">
        <Select
          value={category}
          onChange={handleCategory}
          options={CATEGORIES}
        />
      </FieldGroup>

      <FieldGroup label="Event Title">
        <TextInput
          value={title}
          onChange={(value) => setPosterField('title', value)}
          placeholder="e.g. Introduction to Machine Learning"
        />
      </FieldGroup>

      <FieldGroup label="Subtitle / Theme">
        <TextInput
          value={subtitle}
          onChange={(value) => setPosterField('subtitle', value)}
          placeholder="e.g. Bridging Theory and Practice"
        />
      </FieldGroup>

      <Row2>
        <FieldGroup label="Date">
          <TextInput
            type="date"
            value={date}
            onChange={(value) => setPosterField('date', value)}
          />
        </FieldGroup>
        <FieldGroup label="Time">
          <TextInput
            type="time"
            value={time}
            onChange={(value) => setPosterField('time', value)}
          />
        </FieldGroup>
      </Row2>

      <FieldGroup label="Venue">
        <TextInput
          value={venue}
          onChange={(value) => setPosterField('venue', value)}
          placeholder="e.g. Seminar Hall A, Block IV"
        />
      </FieldGroup>

      <FieldGroup label="Target Audience">
        <TextInput
          value={audience}
          onChange={(value) => setPosterField('audience', value)}
          placeholder="e.g. II & III Year B.E. Students"
        />
      </FieldGroup>

      <FieldGroup label="Registration / Info Link (for QR)">
        <TextInput
          value={reglink}
          onChange={(value) => setPosterField('reglink', value)}
          placeholder="https://forms.gle/..."
        />
      </FieldGroup>

      <FieldGroup label="Show QR Code on Poster">
        <Select
          value={String(showQR)}
          onChange={(value) => setPosterField('showQR', value === 'true')}
          options={[
            { value: 'false', label: 'No' },
            { value: 'true',  label: 'Yes' },
          ]}
        />
      </FieldGroup>
           <SectionLabel>Sustainable Development Goals</SectionLabel>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SDG_OPTIONS.map((sdg) => {
                  const selected = sdgs.includes(sdg.value);

                  return (
                    <button
                      key={sdg.value}
                      onClick={() => handleSDGChange(sdg.value)}
                      style={{
                        border: selected ? '2px solid #4ade80' : '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 6,
                        padding: 4,
                        cursor: 'pointer',
                        background: 'transparent',
                        opacity: selected ? 1 : 0.6,
                      }}
                    >
                      <img
                        src={sdg.img}
                        alt={sdg.label}
                        style={{ width: 40, height: 40 }}
                      />
                    </button>
                  );
                })}
              </div>

   
      
    </>
  );
}
