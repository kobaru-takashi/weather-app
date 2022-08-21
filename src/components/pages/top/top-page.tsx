import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui/button";
import Paperbase from "../sidebar/Paperbase";
import { Sidebar } from "../sidebar/sidebar";

export const TopPage = () => {

  return (
    <div>
      <Paperbase/>
    </div>
  );
};
