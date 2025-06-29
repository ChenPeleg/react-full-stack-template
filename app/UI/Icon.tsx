import React from 'react';
import PropTypes from 'prop-types';
import visibility from '../assets/icons/visibility.svg';
import eyeIcon from '../assets/icons/eye-icon.svg';
import stopWatch from '../assets/icons/stoper-icon.svg';
import threeDots from '../assets/icons/three-dots-icon.svg';
import visibilityOff from '../assets/icons/visibility-off.svg';
import whatsapp from '../assets/icons/green-whatsapp.svg';
import user from '../assets/icons/user.svg';
import history from '../assets/icons/history.svg';
import search from '../assets/icons/search.svg';
import home from '../assets/icons/home.svg';
import vehicle from '../assets/icons/vehicle.svg';
import close from '../assets/icons/close.svg';
import handleEventHand from '../assets/icons/handle-event-hand.svg';
import checkApproval from '../assets/svg/check-approval.svg';
import backChevron from '../assets/icons/chevron.svg';
import chevronDown from '../assets/icons/chevron-down.svg';
import audioBlack from '../assets/icons/audio-black.svg';

import infoBlack from '../assets/icons/info-black.svg';
import bigMenuTriangle from '../assets/icons/big-menu-triangle.svg';

import saveIcon from '../assets/icons/save-icon.svg';
import addUser from '../assets/icons/add-user.svg';
import bandaid from '../assets/icons/bandaid.svg';
import bulletPoints from '../assets/icons/bullet-points.svg';
import document from '../assets/icons/document.svg';
import emetgancySiren from '../assets/icons/emetgancy-siren.svg';
import eventStatus from '../assets/icons/event-status.svg';
import eventType from '../assets/icons/event-type.svg';
import folder from '../assets/icons/folder.svg';
import location from '../assets/icons/location.svg';
import medical from '../assets/icons/medical.svg';
import personSmall from '../assets/icons/person-small.svg';
import urgencyTriangle from '../assets/icons/urgency-triangle.svg';
import vehicleForm from '../assets/icons/vehicle-form.svg';
import blackNoteIcon from '../assets/icons/note-icon.svg';
import blackPhone from '../assets/icons/phone.svg';
import geolocationIcon from '../assets/icons/geolocation-icon.svg';
import cloudUpdateSuccess from '../assets/icons/cloud-update-success.svg';
import assignToAnother from '../assets/icons/assign-to-another.svg';
import exitBlack from '../assets/icons/exit-black.svg';
import devModeBlack from '../assets/icons/developer-mode-black.svg';
import returnFromVehicle from '../assets/icons/return-to-vehicle.svg';
import loadingSpinner from '../assets/svg/loading-spinner.svg';
import minimize from '../assets/icons/minimize.svg';
import expand from '../assets/icons/expand.svg';
import removePerson from '../assets/icons/remove-person-black.svg';
import deleteIcon from '../assets/icons/delete.svg';
import versionUpdate from '../assets/icons/version-update.svg';
import homeColor from '../assets/images/home.svg';
import folderPlain from '../assets/images/folder-plain.png';
import scripts from '../assets/images/scripts.svg';
import windows from '../assets/images/windows.svg';
import apps from '../assets/images/apps.png';
import playSound from '../assets/icons/play-sound.svg';
import pauseSound from '../assets/icons/pause-sound.svg';


export type IconName = Omit<keyof typeof Icon, 'buildIcon' | 'getIconFromIconName'>;

export class Icon {
    constructor() {
    }

    static buildIcon = (svgFile: string) => {
        const IconComponent = (props: React.HTMLProps<HTMLImageElement> & { preventDarkMode?: boolean }) => (<img
            src={svgFile}
            alt={`icon ${svgFile}`}
            className={`${props.preventDarkMode ? '' : 'dark:invert '}  ${props.className || ''}`}
        />);

        IconComponent.propTypes = {
            className: PropTypes.string,
            preventDarkMode: PropTypes.bool,
        };
        IconComponent.displayName = `Icon(${svgFile.split('/').pop()})`;
        return IconComponent;
    };

    static VisibilityOn = Icon.buildIcon(visibility);
    static VisibilityOff = Icon.buildIcon(visibilityOff);
    static StopWatch = Icon.buildIcon(stopWatch);
    static ThreeDots = Icon.buildIcon(threeDots);
    static Eye = Icon.buildIcon(eyeIcon);
    static WhatsApp = Icon.buildIcon(whatsapp);
    static user = Icon.buildIcon(user);
    static home = Icon.buildIcon(home);
    static vehicle = Icon.buildIcon(vehicle);
    static history = Icon.buildIcon(history);
    static close = Icon.buildIcon(close);
    static checkApproval = Icon.buildIcon(checkApproval);
    static handleEventHand = Icon.buildIcon(handleEventHand);
    static backChevron = Icon.buildIcon(backChevron);
    static minimize = Icon.buildIcon(minimize);
    static expand = Icon.buildIcon(expand);
    static chevronDown = Icon.buildIcon(chevronDown);


    static bigMenuTriangle = Icon.buildIcon(bigMenuTriangle);
    static playSound = Icon.buildIcon(playSound);
    static pauseSound = Icon.buildIcon(pauseSound);
    static saveIcon = Icon.buildIcon(saveIcon);
    static addUser = Icon.buildIcon(addUser);
    static bandaid = Icon.buildIcon(bandaid);
    static bulletPoints = Icon.buildIcon(bulletPoints);
    static document = Icon.buildIcon(document);
    static emergencySiren = Icon.buildIcon(emetgancySiren);
    static eventStatus = Icon.buildIcon(eventStatus);
    static eventType = Icon.buildIcon(eventType);
    static folder = Icon.buildIcon(folder);
    static location = Icon.buildIcon(location);
    static medical = Icon.buildIcon(medical);
    static personSmall = Icon.buildIcon(personSmall);
    static urgencyTriangle = Icon.buildIcon(urgencyTriangle);
    static vehicleForm = Icon.buildIcon(vehicleForm);
    static blackNoteIcon = Icon.buildIcon(blackNoteIcon);
    static blackPhone = Icon.buildIcon(blackPhone);
    static geolocationIcon = Icon.buildIcon(geolocationIcon);
    static info = Icon.buildIcon(infoBlack);

    static cloudUpdateSuccess = Icon.buildIcon(cloudUpdateSuccess);
    static assignToAnother = Icon.buildIcon(assignToAnother);
    static exitBlack = Icon.buildIcon(exitBlack);
    static search = Icon.buildIcon(search);
    static returnFromVehicle = Icon.buildIcon(returnFromVehicle);
    static loadingSpinner = Icon.buildIcon(loadingSpinner);
    static audioBlack = Icon.buildIcon(audioBlack);
    static devModeBlack = Icon.buildIcon(devModeBlack);
    static removePerson = Icon.buildIcon(removePerson);
    static deleteIcon = Icon.buildIcon(deleteIcon);
    static versionUpdate = Icon.buildIcon(versionUpdate);
    static homeColor = Icon.buildIcon(homeColor);

    static folderPlain = Icon.buildIcon(folderPlain);
    static scripts = Icon.buildIcon(scripts);
    static windows = Icon.buildIcon(windows);
    static apps = Icon.buildIcon(apps);

    static getIconFromIconName = (iconName: IconName) => {
        // @ts-expect-error this should work
        return Icon[iconName];
    };
}
