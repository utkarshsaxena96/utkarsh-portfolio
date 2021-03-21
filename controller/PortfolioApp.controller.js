sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Text",
    "sap/m/List",
    "sap/m/FeedListItem",
    "sap/m/StandardListItem",
    "sap/m/Link",
  ],
  function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator,
    MessageToast,
    Fragment,
    Dialog,
    DialogType,
    Button,
    ButtonType,
    Text,
    List,
    FeedListItem,
    StandardListItem,
    Link
  ) {
    "use strict";
    return Controller.extend("MyPortfolio.controller.PortfolioApp", {
      onInit: function () {
        var quickPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/quickData.json";
        var bwProjectPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/bwModel.json";
        var cbpProjectPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/cbpModel.json";
        var abapProjectPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/abapModel.json";
        var hanaProjectPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/hanaModel.json";
        var employmentPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/employment.json";
        var bwSkillPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/bwSkills.json";
        var hanaSkillPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/hanaSkills.json";
        var abapSkillPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/abapSkills.json";
        var ui5SkillPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/ui5Skills.json";
        var ipSkillPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/ipSkills.json";
        var crmSkillPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/crmSkills.json";
        var educationPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/education.json";
        var certificationPath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/certification.json";
        var oQuickJsonModel = new JSONModel(quickPath);
        var oBwModel = new JSONModel(bwProjectPath);
        var oCbpModel = new JSONModel(cbpProjectPath);
        var oAbapModel = new JSONModel(abapProjectPath);
        var oHanaModel = new JSONModel(hanaProjectPath);
        var oEmployModel = new JSONModel(employmentPath);
        var oBwSkillModel = new JSONModel(bwSkillPath);
        var oHanaSkillModel = new JSONModel(hanaSkillPath);
        var oAbapSkillModel = new JSONModel(abapSkillPath);
        var oUi5SkillModel = new JSONModel(ui5SkillPath);
        var oipSkillModel = new JSONModel(ipSkillPath);
        var ocrmSkillModel = new JSONModel(crmSkillPath);
        var oEducationModel = new JSONModel(educationPath);
        var oCertificationModel = new JSONModel(certificationPath);
        this.getView().setModel(oQuickJsonModel, "QuickViewModel");
        this.getView().setModel(oBwModel, "BwModel");
        this.getView().setModel(oCbpModel, "CbpModel");
        this.getView().setModel(oAbapModel, "AbapModel");
        this.getView().setModel(oHanaModel, "HanaModel");
        this.getView().setModel(oEmployModel, "EmployModel");
        this.getView().setModel(oBwSkillModel, "BwSkill");
        this.getView().setModel(oHanaSkillModel, "HanaSkill");
        this.getView().setModel(oAbapSkillModel, "AbapSkill");
        this.getView().setModel(oUi5SkillModel, "Ui5Skill");
        this.getView().setModel(oipSkillModel, "IpSkill");
        this.getView().setModel(ocrmSkillModel, "CrmSkill");
        this.getView().setModel(oEducationModel, "Education");
        this.getView().setModel(oCertificationModel, "Certify");
      },
      onAfterRendering: function () {
        var oButton = this.byId("utkarshView");
        oButton.$().attr("aria-haspopup", true);
      },
      openQuickView: function (oEvent, oModel) {
        var oButton = oEvent.getSource();

        if (!this._oQuickView) {
          Fragment.load({
            name: "MyPortfolio.view.utkarshView",
            controller: this,
          }).then(
            function (oQuickView) {
              this._oQuickView = oQuickView;
              this._configQuickView(oModel);
              this._oQuickView.openBy(oButton);
            }.bind(this)
          );
        } else {
          this._configQuickView(oModel);
          this._oQuickView.openBy(oButton);
        }
      },
      _configQuickView: function (oModel) {
        this.getView().addDependent(this._oQuickView);
        this._oQuickView.close();
        this._oQuickView.setModel(oModel);
      },
      utkarshQuickView: function (oEvent) {
        var oModel = this.getView().getModel("QuickViewModel");
        this.openQuickView(oEvent, oModel);
      },
      onPressExperience: function () {
        if (!this.oExperienceDialog) {
          this.oExperienceDialog = new Dialog({
            type: DialogType.Message,
            title: "Employment Details",
            content: new List({
              items: {
                path: "EmployModel>/employer",
                template: new FeedListItem({
                  sender: "{EmployModel>Employer}",
                  text: "{EmployModel>Designation}",
                  info: "{EmployModel>Duration}",
                  icon: "{EmployModel>logo}",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oExperienceDialog.close();
              }.bind(this),
            }),
          });
          //to get access to the controller's model
          this.getView().addDependent(this.oExperienceDialog);
        } else {
          this.oExperienceDialog.open();
        }
      },
      onBwPress: function () {
        if (!this.oBwDialog) {
          this.oBwDialog = new Dialog({
            title: "SAP Business Warehouse skills",
            type: DialogType.Message,
            content: new List({
              items: {
                path: "BwSkill>/bwSkill",
                template: new StandardListItem({
                  title: "{BwSkill>info}",
                  wrapping: true,
                  type: "Active",
                  icon: "sap-icon://begin",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oBwDialog.close();
              }.bind(this),
            }),
          });
          //in order to get access to the Controller's model
          this.getView().addDependent(this.oBwDialog);
        } else {
          this.oBwDialog.open();
        }
      },
      onHanaPress: function () {
        if (!this.oHanaDialog) {
          this.oHanaDialog = new Dialog({
            title: "SAP HANA skills",
            type: DialogType.Message,
            content: new List({
              items: {
                path: "HanaSkill>/hanaSkill",
                template: new StandardListItem({
                  title: "{HanaSkill>info}",
                  wrapping: true,
                  type: "Active",
                  icon: "sap-icon://begin",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oHanaDialog.close();
              }.bind(this),
            }),
          });
          //in order to get access to the Controller's model
          this.getView().addDependent(this.oHanaDialog);
        } else {
          this.oHanaDialog.open();
        }
      },
      onAbapPress: function () {
        if (!this.oAbapDialog) {
          this.oAbapDialog = new Dialog({
            title: "SAP ABAP skills",
            type: DialogType.Message,
            content: new List({
              items: {
                path: "AbapSkill>/abapSkill",
                template: new StandardListItem({
                  title: "{AbapSkill>info}",
                  wrapping: true,
                  type: "Active",
                  icon: "sap-icon://begin",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oAbapDialog.close();
              }.bind(this),
            }),
          });
          //in order to get access to the Controller's model
          this.getView().addDependent(this.oAbapDialog);
        } else {
          this.oAbapDialog.open();
        }
      },
      onUi5Press: function () {
        if (!this.oUi5Dialog) {
          this.oUi5Dialog = new Dialog({
            title: "SAP UI5 skills",
            type: DialogType.Message,
            content: new List({
              items: {
                path: "Ui5Skill>/ui5Skill",
                template: new StandardListItem({
                  title: "{Ui5Skill>info}",
                  wrapping: true,
                  type: "Active",
                  icon: "sap-icon://begin",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oUi5Dialog.close();
              }.bind(this),
            }),
          });
          //in order to get access to the Controller's model
          this.getView().addDependent(this.oUi5Dialog);
        } else {
          this.oUi5Dialog.open();
        }
      },
      onIpPress: function () {
        if (!this.oIpDialog) {
          this.oIpDialog = new Dialog({
            title: "SAP BW Integrated Planning skills",
            type: DialogType.Message,
            content: new List({
              items: {
                path: "IpSkill>/ipSkill",
                template: new StandardListItem({
                  title: "{IpSkill>info}",
                  wrapping: true,
                  type: "Active",
                  icon: "sap-icon://begin",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oIpDialog.close();
              }.bind(this),
            }),
          });
          //in order to get access to the Controller's model
          this.getView().addDependent(this.oIpDialog);
        } else {
          this.oIpDialog.open();
        }
      },
      onCrmPress: function () {
        if (!this.oCrmDialog) {
          this.oCrmDialog = new Dialog({
            title:
              "SAP Customer Business Planning - Trade Promotion Management skills",
            type: DialogType.Message,
            content: new List({
              items: {
                path: "CrmSkill>/crmSkill",
                template: new StandardListItem({
                  title: "{CrmSkill>info}",
                  wrapping: true,
                  type: "Active",
                  icon: "sap-icon://begin",
                }),
              },
            }),
            endButton: new Button({
              text: "Close",
              press: function () {
                this.oCrmDialog.close();
              }.bind(this),
            }),
          });
          //in order to get access to the Controller's model
          this.getView().addDependent(this.oCrmDialog);
        } else {
          this.oCrmDialog.open();
        }
      },
      onPressResume: function () {
        //window.open("https://www.google.co.in", "_blank");
        let sResumePath =
          sap.ui.require.toUrl("MyPortfolio/model") + "/resume.pdf";
        sap.m.URLHelper.redirect(sResumePath, true);
        new MessageToast.show(`Opened PDF copy of Resume`);
      },
      onPressGit: function () {
        let sGitUrl = "https://github.com/utkarshsaxena96";
        sap.m.URLHelper.redirect(sGitUrl, true);
        new MessageToast.show(`Redirected to GitHub page`);
      },
      onPressCertify: function (oEvent) {
        let sqlCertUrl =
          sap.ui.require.toUrl("MyPortfolio/model") + "/sql-cert.pdf";
        let hash = {
          "__item5-__list5-0":
            "https://freecodecamp.org/certification/utkarsh-saxena/apis-and-microservices",
          "__item5-__list5-1":
            "https://www.freecodecamp.org/certification/utkarsh-saxena/javascript-algorithms-and-data-structures",
          "__item5-__list5-2":
            "https://www.hackerrank.com/certificates/d167e2f2131c",
          "__item5-__list5-3":
            "https://open.sap.com/verify/xutet-birat-vakof-molon-cepyn",
          "__item5-__list5-4": sqlCertUrl,
        };
        let clickedCert = oEvent.getSource().getId();
        if (hash[clickedCert]) {
          sap.m.URLHelper.redirect(hash[clickedCert], true);
        }
      },
    });
  }
);
