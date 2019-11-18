import React from "react";

const IndustryRoleDropdowns = () => {
  <FormGroup row>
    <GridItem xs="12" md="6">
      <FormControl variant="outlined">
        <InputLabel htmlFor="industryList">Select Industry</InputLabel>
        <Select
          name="industry"
          required
          fullWidth
          labelWidth={110}
          input={<OutlinedInput name="industry" id="indList" />}
          // value={industry}
          {...useInput('industry', 'isRequired')}
        // onChange={(e) => setIndustry(e.target.value)}
        >
          {renderFromArray(industryList)}
        </Select>
        <FormHelperText color="muted">What industry does your project cover?</FormHelperText>
      </FormControl>
    </GridItem>
    <GridItem xs="12" md="6">
      <FormControl variant="outlined">
        <InputLabel htmlFor="industryList">Select Role</InputLabel>
        <Select
          name="role"
          required
          fullWidth
          labelWidth={80}
          input={<OutlinedInput name="role" id="indList" />}
          // value={role}
          {...useInput('role', 'isRequired')}
        // onChange={(e) => setRole(e.target.value)}
        >
          {values.industry === "Art & Collectibles" && renderFromArray(artRoles)}
          {values.industry === "Certification" && renderFromArray(certification)}
          {values.industry === "Shipping" && renderFromArray(shipping)}
          {values.industry === "Agriculture" && renderFromArray(agriculture)}
        </Select>
        <FormHelperText color="muted">Select your role for project?</FormHelperText>
      </FormControl>
    </GridItem>
  </FormGroup>
}
