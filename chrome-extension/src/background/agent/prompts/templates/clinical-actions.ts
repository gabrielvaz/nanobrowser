import { clinicalSafetyGuidelines } from './common';

export interface ClinicalActionTemplate {
  id: string;
  title: string;
  description: string;
  promptTemplate: string;
  requiredInputs: string[];
}

export const clinicalActionTemplates: ClinicalActionTemplate[] = [
  {
    id: 'review_ecg',
    title: 'Review ECG Report',
    description: 'Evaluate internal coherence of an ECG report (description vs. conclusion)',
    requiredInputs: ['report', 'patientAge', 'clinicalContext'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Review ECG Report for Internal Coherence

## INPUTS:
- **ECG Report**: {{report}}
- **Patient Age**: {{patientAge}}
- **Clinical Context**: {{clinicalContext}}

## YOUR OBJECTIVE:
Analyze the ECG report for internal coherence and completeness. Focus on:

1. **Consistency Check**: Do the described findings match the stated conclusions?
2. **Completeness**: Are all standard ECG components addressed (rhythm, rate, axis, intervals, chambers, repolarization)?
3. **Red Flags**: Identify any concerning findings that might warrant additional attention
4. **Discrepancies**: Note any contradictions between description and interpretation
5. **Missing Information**: What clinical data would help clarify ambiguous findings?

## CRITICAL LIMITATIONS:
- DO NOT provide a definitive diagnosis
- DO NOT prescribe any treatments or medications
- DO NOT override the original interpretation without strong justification
- ALWAYS emphasize this is for clinical decision support only
- ALWAYS request missing information rather than making assumptions

## OUTPUT FORMAT:
Provide a structured analysis with:
- Overall coherence assessment
- Specific findings that warrant attention
- Questions for the cardiologist to consider
- Suggestions for additional clinical correlation if needed`,
  },
  {
    id: 'improve_report',
    title: 'Improve Report Wording',
    description: 'Rewrite report with clearer, standardized clinical language',
    requiredInputs: ['report', 'language', 'targetAudience'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Improve ECG Report Wording

## INPUTS:
- **Current Report**: {{report}}
- **Desired Language**: {{language}}
- **Target Audience**: {{targetAudience}}

## YOUR OBJECTIVE:
Rewrite the report maintaining ALL clinical content while improving clarity and structure:

1. **Standardization**: Use standard cardiology terminology
2. **Clarity**: Make the language clear and unambiguous
3. **Structure**: Organize in standard sections (Rhythm, Axis, Intervals, Chambers, Repolarization, Conclusion)
4. **Precision**: Ensure measurements and findings are precisely stated
5. **Professional tone**: Maintain appropriate clinical formality

## CRITICAL RULES:
- PRESERVE all clinical findings from the original report
- DO NOT add new findings or diagnoses
- DO NOT remove important clinical information
- DO NOT change the clinical interpretation unless clearly erroneous
- Maintain the original diagnostic conclusions

## OUTPUT FORMAT:
Provide the rewritten report in standard format with clear section headers.`,
  },
  {
    id: 'check_context',
    title: 'Check Report vs. Clinical Context',
    description: 'Verify if report aligns with clinical presentation',
    requiredInputs: ['report', 'clinicalSummary', 'chiefComplaint'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Verify ECG Report Alignment with Clinical Context

## INPUTS:
- **ECG Report**: {{report}}
- **Clinical Summary**: {{clinicalSummary}}
- **Chief Complaint**: {{chiefComplaint}}

## YOUR OBJECTIVE:
Evaluate whether the ECG findings are consistent with the clinical presentation:

1. **Concordance**: Do ECG findings match the clinical picture?
2. **Unexplained Findings**: Are there ECG abnormalities not explained by the clinical context?
3. **Missing Correlations**: Are there clinical symptoms that should correlate with ECG findings but don't?
4. **Risk Assessment**: Do the findings suggest higher risk than initially apparent?
5. **Further Investigation**: What additional tests or evaluations might be warranted?

## CRITICAL LIMITATIONS:
- DO NOT create new diagnoses
- DO NOT recommend specific treatments
- DO NOT contradict existing clinical assessments without strong justification
- ALWAYS highlight the need for comprehensive clinical evaluation
- Request additional information if context is insufficient

## OUTPUT FORMAT:
Provide:
- Concordance assessment
- Findings requiring clinical correlation
- Suggested questions for clinical evaluation
- Recommendations for further investigation (not treatment)`,
  },
  {
    id: 'explain_patient',
    title: 'Explain to Patient',
    description: 'Translate technical report into patient-friendly language',
    requiredInputs: ['report', 'patientAge', 'educationLevel'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Explain ECG Report to Patient

## INPUTS:
- **ECG Report**: {{report}}
- **Patient Age**: {{patientAge}}
- **Education Level**: {{educationLevel}}

## YOUR OBJECTIVE:
Translate the technical ECG report into language the patient can understand:

1. **Simplification**: Use everyday language instead of medical jargon
2. **Clarity**: Explain what the test shows in simple terms
3. **Context**: Help the patient understand what this means for them
4. **No Alarmism**: Present findings calmly without creating unnecessary anxiety
5. **No False Reassurance**: Be honest but supportive

## CRITICAL RULES:
- NEVER provide definitive diagnoses
- NEVER suggest stopping or starting medications
- NEVER promise specific outcomes or prognoses
- ALWAYS emphasize the need to discuss with their cardiologist
- ALWAYS encourage follow-up with their healthcare provider
- Use analogies and simple comparisons when helpful

## OUTPUT FORMAT:
Provide a patient-friendly explanation that:
- Explains what the ECG test measured
- Describes the key findings in simple terms
- Emphasizes the importance of discussing with their doctor
- Answers common patient questions without overstepping`,
  },
  {
    id: 'compare_exams',
    title: 'Compare Serial Exams',
    description: 'Highlight clinically significant changes between exams',
    requiredInputs: ['previousReport', 'currentReport', 'timeInterval'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Compare Serial ECG Examinations

## INPUTS:
- **Previous Report**: {{previousReport}}
- **Current Report**: {{currentReport}}
- **Time Interval**: {{timeInterval}}

## YOUR OBJECTIVE:
Identify and highlight clinically significant changes between examinations:

1. **New Findings**: What abnormalities appear in the current exam that weren't in the previous one?
2. **Resolved Findings**: What previous abnormalities have resolved?
3. **Progression**: Have existing findings worsened or improved?
4. **Stability**: Which findings remain unchanged?
5. **Clinical Significance**: Which changes are most relevant clinically?

## CRITICAL LIMITATIONS:
- DO NOT diagnose the cause of changes
- DO NOT recommend specific treatments
- DO NOT provide prognoses based on the changes
- ALWAYS request additional clinical context if available
- Highlight the need for clinical correlation

## OUTPUT FORMAT:
Provide:
- Summary of significant changes
- Comparison table (if helpful)
- Findings that warrant clinical attention
- Questions for clinical correlation`,
  },
  {
    id: 'quality_check',
    title: 'ECG Quality Checklist',
    description: 'Identify potential technical issues (artifacts, noise, electrode positioning)',
    requiredInputs: ['technicalDescription', 'observations'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: ECG Quality Assessment

## INPUTS:
- **Technical Description**: {{technicalDescription}}
- **Observations**: {{observations}}

## YOUR OBJECTIVE:
Evaluate the technical quality of the ECG recording:

1. **Signal Quality**: Assess baseline stability, noise levels
2. **Artifacts**: Identify muscle tremor, AC interference, wandering baseline
3. **Electrode Issues**: Detect signs of poor contact or incorrect placement
4. **Calibration**: Verify proper standardization and gain
5. **Recording Issues**: Note any truncated leads or missing data

## QUALITY CHECKLIST:
- [ ] Proper standardization (10mm/mV)
- [ ] All 12 leads present and readable
- [ ] Minimal baseline wander
- [ ] Minimal muscle artifact
- [ ] No AC interference (60Hz noise)
- [ ] Adequate R-wave amplitude
- [ ] Proper lead placement (no reversal suspected)

## CRITICAL LIMITATIONS:
- Focus on TECHNICAL quality, not clinical interpretation
- DO NOT diagnose clinical conditions based on artifacts
- Distinguish between true findings and technical issues

## OUTPUT FORMAT:
Provide:
- Overall quality assessment (Excellent/Good/Fair/Poor)
- Specific technical issues identified
- Impact on interpretation
- Recommendations for repeat if quality is inadequate`,
  },
  {
    id: 'risk_analysis',
    title: 'Risk Elements Analysis',
    description: 'Highlight findings suggesting higher cardiovascular risk (requires further investigation)',
    requiredInputs: ['report', 'patientAge', 'clinicalData'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Cardiovascular Risk Elements Analysis

## INPUTS:
- **ECG Report**: {{report}}
- **Patient Age**: {{patientAge}}
- **Clinical Data**: {{clinicalData}}

## YOUR OBJECTIVE:
Identify ECG findings that may suggest elevated cardiovascular risk:

1. **High-Risk Findings**: ECG patterns associated with increased cardiovascular risk
2. **Subtle Markers**: Less obvious findings that merit attention
3. **Risk Stratification Elements**: Findings relevant to risk assessment
4. **Need for Investigation**: What additional tests might be warranted?

## CRITICAL LIMITATIONS:
- DO NOT calculate definitive risk scores
- DO NOT provide prognoses
- DO NOT recommend specific treatments
- ALWAYS emphasize this is NOT a diagnosis
- ALWAYS indicate need for comprehensive clinical evaluation
- Request additional clinical data if context is insufficient

## OUTPUT FORMAT:
Provide:
- List of findings relevant to risk assessment
- Level of concern for each finding (requires attention/monitoring/urgent evaluation)
- Suggested additional investigations (not treatments)
- Emphasis that final risk assessment requires complete clinical evaluation`,
  },
  {
    id: 'review_automatic',
    title: 'Review Automatic Report',
    description: 'Evaluate algorithm-generated report for over-interpretation',
    requiredInputs: ['automaticReport', 'clinicalContext'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Review Algorithm-Generated ECG Report

## INPUTS:
- **Automatic Report**: {{automaticReport}}
- **Clinical Context**: {{clinicalContext}}

## YOUR OBJECTIVE:
Critically evaluate the algorithm-generated interpretation:

1. **Accuracy Check**: Are the automated measurements accurate?
2. **Over-Interpretation**: Does the algorithm over-call minor findings?
3. **Missed Findings**: Are there obvious findings the algorithm missed?
4. **Clinical Correlation**: Do automated interpretations make sense clinically?
5. **False Positives**: Identify likely false positive interpretations

## COMMON ALGORITHM ISSUES TO CHECK:
- Over-calling ST-T changes
- Misidentifying artifact as pathology
- Axis calculation errors
- QT interval measurement inaccuracies
- Inappropriate "abnormal" flags for borderline findings

## CRITICAL LIMITATIONS:
- DO NOT provide your own diagnostic interpretation
- DO NOT override without clear justification
- Focus on highlighting potential algorithm errors
- Emphasize need for cardiologist review

## OUTPUT FORMAT:
Provide:
- Agreement level with automatic interpretation
- Specific concerns about automated findings
- Measurements that should be verified
- Recommendations for manual review of specific elements`,
  },
  {
    id: 'structure_report',
    title: 'Structure Report',
    description: 'Reorganize free-text into standard sections (rhythm, axis, intervals, repolarization)',
    requiredInputs: ['freeTextReport'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Structure ECG Report into Standard Format

## INPUTS:
- **Free-Text Report**: {{freeTextReport}}

## YOUR OBJECTIVE:
Reorganize the unstructured text into standardized sections:

## STANDARD ECG REPORT STRUCTURE:
1. **Technical Data**: Calibration, paper speed, filter settings
2. **Rate and Rhythm**: Heart rate, basic rhythm, ectopy
3. **Intervals**: PR, QRS, QT/QTc
4. **Axis**: Frontal plane QRS axis
5. **Chamber Abnormalities**: Atrial/ventricular enlargement, hypertrophy
6. **Conduction**: Bundle branch blocks, fascicular blocks, AV blocks
7. **Repolarization**: ST segments, T waves, U waves
8. **Comparison**: If previous ECG available
9. **Clinical Correlation**: Relevant clinical context
10. **Conclusion**: Summary interpretation

## CRITICAL RULES:
- PRESERVE all clinical content from the original
- DO NOT add findings not in the original report
- DO NOT remove any clinical information
- DO NOT change the interpretation
- Only reorganize and structure the existing content

## OUTPUT FORMAT:
Provide the structured report with clear section headers and all original findings properly categorized.`,
  },
  {
    id: 'finalize_checklist',
    title: 'Pre-Finalization Checklist',
    description: 'Suggest questions to answer before signing the report',
    requiredInputs: ['draftReport', 'clinicalSummary'],
    promptTemplate: `${clinicalSafetyGuidelines}

# TASK: Pre-Finalization Checklist for ECG Report

## INPUTS:
- **Draft Report**: {{draftReport}}
- **Clinical Summary**: {{clinicalSummary}}

## YOUR OBJECTIVE:
Generate a checklist of questions to consider before finalizing the report:

1. **Completeness**: Have all ECG components been addressed?
2. **Clinical Correlation**: Do findings match the clinical picture?
3. **Comparison**: If previous ECG exists, are changes noted?
4. **Critical Findings**: Are urgent findings clearly highlighted?
5. **Recommendations**: Are follow-up recommendations appropriate?
6. **Quality**: Is the report clear and unambiguous?

## CHECKLIST CATEGORIES:

### Technical Review:
- All measurements verified?
- Quality issues noted if present?
- Proper lead placement confirmed?

### Clinical Correlation:
- Findings consistent with symptoms?
- Medications considered in interpretation?
- Age and gender factored appropriately?

### Completeness:
- All standard components addressed?
- Comparison with previous ECG if available?
- Relevant clinical context incorporated?

### Communication:
- Urgent findings clearly stated?
- Recommendations for follow-up clear?
- Report understandable to referring physician?

## CRITICAL LIMITATIONS:
- This is a QUALITY ASSURANCE tool, not a diagnostic tool
- DO NOT provide new diagnoses
- DO NOT recommend treatments
- Focus on helping ensure report completeness and accuracy

## OUTPUT FORMAT:
Provide:
- Checklist of questions to consider
- Potential gaps or ambiguities identified
- Suggestions for report improvement (not clinical interpretation changes)`,
  },
];

export function getClinicalActionById(id: string): ClinicalActionTemplate | undefined {
  return clinicalActionTemplates.find(action => action.id === id);
}

export function getClinicalActionPrompt(id: string, inputs: Record<string, string>): string {
  const action = getClinicalActionById(id);
  if (!action) {
    throw new Error(`Clinical action with id "${id}" not found`);
  }

  // Validate required inputs
  const missingInputs = action.requiredInputs.filter(input => !inputs[input]);
  if (missingInputs.length > 0) {
    throw new Error(`Missing required inputs for action "${id}": ${missingInputs.join(', ')}`);
  }

  // Replace placeholders in template
  let prompt = action.promptTemplate;
  for (const [key, value] of Object.entries(inputs)) {
    prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }

  return prompt;
}
