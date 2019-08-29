function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">'Life' Clockface Settings</Text>}>
        <TextInput
          label="Birth Date (YYYY-MM-DD)"
          settingsKey="birthDate"
          placeholder="YYYY-MM-DD"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
