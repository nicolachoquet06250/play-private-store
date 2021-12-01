<template>
  <ion-app>
    <ion-content>
      <ion-title> {{ __('pages.about.title', 'A propos') }} </ion-title>

      <ion-segment :value="tab">
        <ion-segment-button value="description" @click="tab = 'description'">
          <ion-label> {{ __('pages.about.descriptionTabTitle', 'Description') }} </ion-label>
        </ion-segment-button>

        <ion-segment-button value="process" @click="tab = 'process'">
          <ion-label> {{ __('pages.about.processTabTitle', 'Processus') }} </ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid v-if="tab === 'description'">
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-list-header>
                <ion-label>
                  {{ __('pages.about.descriptionTabTitle', 'Description') }}
                </ion-label>
              </ion-list-header>

              <ion-item>
                <ion-label>
                  <p style="margin-bottom: 15px;">{{ __('pages.about.descriptionTabFirstParagraph', `Cette application à été créée dans le but de simplifier le partage des applications de tests entre équipe et d'élargire le domaine de test au bon vouloir du dévelopeur.`) }}</p>

                  <p>{{ __('pages.about.descriptionTabListHeader', `Vous n'avez qu'à`) }} :

                    <ul>
                      <li>{{ __('pages.about.descriptionTabListFirstElement', `Créer une application`) }}</li>

                      <li>{{ __('pages.about.descriptionTabListSecondElement', `Remplire le formulaire`) }}</li>

                      <li>{{ __('pages.about.descriptionTabListThirdElement', `Laisser les testeurs mettre leur avis et leur note`) }}</li>
                    </ul>
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid v-if="tab === 'process'">
        <ion-row>
          <ion-list>
            <ion-list-header>
              <ion-label> {{ __('pages.about.processTabRequestedTitle', 'Prerequis') }} </ion-label>
            </ion-list-header>

            <ion-item>
              <ion-label>
                <a href="https://www.frandroid.com/comment-faire/tutoriaux/184906_comment-acceder-au-mode-developpeur-sur-android" target="_blank">
                  {{ __('pages.about.modeDeveloperLink', 'Passer votre mobile en mode développeur') }}
                </a>

                <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/arrow-redo-circle.svg"></ion-icon>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>
                <a href="https://www.frandroid.com/comment-faire/tutoriaux/231266_autoriserlessourcesinconnues" target="_blank">
                  {{ __('pages.about.unknownSource', 'Autoriser les sources inconnues') }}
                </a>

                <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/arrow-redo-circle.svg"></ion-icon>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>
                <a href="https://support.mobile-tracker-free.com/hc/fr/articles/360005346953-Comment-d%C3%A9sactiver-Google-Play-Protect-" target="_blank">
                  {{ __('pages.about.disableProtect', 'Desactiver "Google Play Protect"') }}
                </a>

                <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/arrow-redo-circle.svg"></ion-icon>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-list>
              <ion-list-header>
                <ion-label> {{ __('pages.about.processTabInstallationTitle', 'Installation') }} </ion-label>
              </ion-list-header>

              <ion-item>
                <ion-label>
                  {{ __('pages.about.processTabInstallationFirstStep', `Cliquer sur l'application qui vous intéresse`) }}
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  {{ __('pages.about.processTabInstallationSecondStep', `Cliquer sur "Installer"`) }}
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  {{ __('pages.about.processTabInstallationThirdStep', `Sélectionner le fichier téléchargé`) }}
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  {{ __('pages.about.processTabInstallationFourthStep', `Cliquer sur "Installer"`) }}
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-app>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchbar, useTranslate } from '@/hooks';

const { hide } = useSearchbar();
const { __ } = useTranslate();

const tab = ref('description');

hide();
</script>

<style>
#main {
    padding-top: 65px!important;
}
</style>

<style scoped>
  ion-title {
    margin-top: 15px;
  }

  a {
    color: black;
    text-decoration: none;
  }

  .segment .label {
    margin: 0;
  }

  p, 
  ul li, 
  .label.label-md, 
  a {
    white-space: break-spaces;
  }
</style>