import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

// Clinical action definition
export interface ClinicalAction {
  id: string;
  titleKey: string; // i18n key for title
  descKey: string; // i18n key for description
  enabled: boolean;
}

// Default clinical actions matching the templates
const defaultClinicalActions: ClinicalAction[] = [
  {
    id: 'review_ecg',
    titleKey: 'clinical_action_reviewEcg_title',
    descKey: 'clinical_action_reviewEcg_desc',
    enabled: true,
  },
  {
    id: 'improve_report',
    titleKey: 'clinical_action_improveReport_title',
    descKey: 'clinical_action_improveReport_desc',
    enabled: true,
  },
  {
    id: 'check_context',
    titleKey: 'clinical_action_checkContext_title',
    descKey: 'clinical_action_checkContext_desc',
    enabled: true,
  },
  {
    id: 'explain_patient',
    titleKey: 'clinical_action_explainPatient_title',
    descKey: 'clinical_action_explainPatient_desc',
    enabled: true,
  },
  {
    id: 'compare_exams',
    titleKey: 'clinical_action_compareExams_title',
    descKey: 'clinical_action_compareExams_desc',
    enabled: true,
  },
  {
    id: 'quality_check',
    titleKey: 'clinical_action_qualityCheck_title',
    descKey: 'clinical_action_qualityCheck_desc',
    enabled: true,
  },
  {
    id: 'risk_analysis',
    titleKey: 'clinical_action_riskAnalysis_title',
    descKey: 'clinical_action_riskAnalysis_desc',
    enabled: true,
  },
  {
    id: 'review_automatic',
    titleKey: 'clinical_action_reviewAutomatic_title',
    descKey: 'clinical_action_reviewAutomatic_desc',
    enabled: true,
  },
  {
    id: 'structure_report',
    titleKey: 'clinical_action_structureReport_title',
    descKey: 'clinical_action_structureReport_desc',
    enabled: true,
  },
  {
    id: 'finalize_checklist',
    titleKey: 'clinical_action_finalizeChecklist_title',
    descKey: 'clinical_action_finalizeChecklist_desc',
    enabled: true,
  },
];

// Storage type
export interface ClinicalActionsStorage {
  initialized: boolean;
  actions: ClinicalAction[];
}

// Storage operations interface
export interface ClinicalActionsStorageOps {
  getAllActions: () => Promise<ClinicalAction[]>;
  getActionById: (id: string) => Promise<ClinicalAction | undefined>;
  toggleAction: (id: string, enabled: boolean) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

// Initial state
const initialState: ClinicalActionsStorage = {
  initialized: false,
  actions: [],
};

// Create the storage
const clinicalActionsStorage: BaseStorage<ClinicalActionsStorage> = createStorage('clinical_actions', initialState, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

/**
 * Creates a storage interface for managing clinical actions
 */
export function createClinicalActionsStorage(): ClinicalActionsStorageOps {
  return {
    getAllActions: async (): Promise<ClinicalAction[]> => {
      const currentState = await clinicalActionsStorage.get();

      // Initialize with default actions if not yet initialized
      if (!currentState.initialized) {
        await clinicalActionsStorage.set({
          initialized: true,
          actions: [...defaultClinicalActions],
        });
        return [...defaultClinicalActions];
      }

      return currentState.actions;
    },

    getActionById: async (id: string): Promise<ClinicalAction | undefined> => {
      const { actions } = await clinicalActionsStorage.get();
      return actions.find(action => action.id === id);
    },

    toggleAction: async (id: string, enabled: boolean): Promise<void> => {
      await clinicalActionsStorage.set(prev => ({
        ...prev,
        actions: prev.actions.map(action => (action.id === id ? { ...action, enabled } : action)),
      }));
    },

    resetToDefaults: async (): Promise<void> => {
      await clinicalActionsStorage.set({
        initialized: true,
        actions: [...defaultClinicalActions],
      });
    },
  };
}

// Export an instance of the storage by default
export default createClinicalActionsStorage();
